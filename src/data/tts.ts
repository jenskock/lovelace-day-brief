import type { HomeAssistant } from "../types";

interface TtsGetUrlResult {
  url?: string;
  path?: string;
}

let activeAudio: HTMLAudioElement | null = null;
let gestureAudio: HTMLAudioElement | null = null;

/**
 * Must run in the click handler before any await (HA frontend pattern).
 * Creates an Audio element and starts play() while the user gesture is live.
 */
export function unlockAudioForGesture(): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    const audio = new Audio();
    gestureAudio = audio;
    void audio.play().catch(() => {
      /* empty play may reject until src is set; element stays gesture-bound */
    });
  } catch {
    /* ignore */
  }
}

export function stopSpeaking(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.removeAttribute("src");
    activeAudio.load();
    activeAudio = null;
  }
  gestureAudio = null;
}

function formatTtsError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  if (error && typeof error === "object") {
    const record = error as {
      message?: unknown;
      code?: unknown;
      error?: unknown;
      body?: unknown;
    };
    if (typeof record.message === "string" && record.message.trim()) {
      return record.code ? `${record.code}: ${record.message}` : record.message;
    }
    if (typeof record.error === "string" && record.error.trim()) {
      return record.error;
    }
    if (typeof record.body === "string" && record.body.trim()) {
      return record.body;
    }
    try {
      return JSON.stringify(error);
    } catch {
      return "unknown TTS error";
    }
  }
  return "unknown TTS error";
}

async function playPath(path: string): Promise<void> {
  const audio = gestureAudio ?? new Audio();
  gestureAudio = null;
  activeAudio = audio;

  await new Promise<void>((resolve, reject) => {
    const onPlaying = () => {
      cleanup();
      resolve();
    };
    const onError = () => {
      cleanup();
      reject(new Error("audio element failed to load TTS stream"));
    };
    const cleanup = () => {
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("error", onError);
    };
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("error", onError);
    audio.src = path;
    void audio.play().catch(() => {
      /* canplaythrough / playing handlers drive success; play() may race */
    });
  });

  await new Promise<void>((resolve, reject) => {
    audio.onended = () => resolve();
    audio.onerror = () =>
      reject(new Error("audio element failed during TTS playback"));
  });

  if (activeAudio === audio) {
    activeAudio = null;
  }
}

/**
 * Prefer Home Assistant TTS engine (e.g. Requesty via OpenAI TTS HACS).
 * Uses the same API as the HA frontend: POST /api/tts_get_url.
 *
 * Call `unlockAudioForGesture()` from the click handler before awaiting this.
 */
export async function speakSummary(options: {
  hass: HomeAssistant;
  text: string;
  language?: string;
  /** TTS engine entity, e.g. tts.openai_tts_gpt_4o_mini_tts */
  ttsEntity?: string;
  /** Optional speaker to also play on */
  mediaPlayer?: string;
}): Promise<void> {
  const text = options.text.trim();
  if (!text) {
    return;
  }

  const language = options.language ?? "en";

  if (options.ttsEntity) {
    try {
      if (typeof options.hass.callApi !== "function") {
        throw new Error("hass.callApi is unavailable");
      }
      // Official HA frontend API (see frontend/src/data/tts.ts).
      const result = await options.hass.callApi<TtsGetUrlResult>(
        "POST",
        "tts_get_url",
        {
          engine_id: options.ttsEntity,
          message: text,
          language,
          cache: true,
        },
      );
      const path = result.path || result.url;
      if (!path) {
        throw new Error("tts_get_url returned no path");
      }
      // Prefer relative /api/tts_proxy/... so the tablet stays on the
      // same origin as the HA frontend, not an internal LAN URL.
      const playable =
        path.startsWith("http://") || path.startsWith("https://")
          ? (() => {
              try {
                const parsed = new URL(path);
                return parsed.pathname.startsWith("/api/tts_proxy/")
                  ? parsed.pathname + parsed.search
                  : path;
              } catch {
                return path;
              }
            })()
          : path;
      await playPath(playable);
    } catch (error) {
      throw new Error(formatTtsError(error));
    }

    if (options.mediaPlayer) {
      await options.hass.callService(
        "tts",
        "speak",
        {
          media_player_entity_id: options.mediaPlayer,
          message: text,
          cache: true,
        },
        { entity_id: options.ttsEntity },
        true,
        false,
      );
    }
    return;
  }

  if (options.mediaPlayer) {
    await options.hass.callService(
      "tts",
      "speak",
      {
        media_player_entity_id: options.mediaPlayer,
        message: text,
        cache: true,
      },
      undefined,
      true,
      false,
    );
    return;
  }

  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
    return;
  }

  throw new Error("No TTS available");
}
