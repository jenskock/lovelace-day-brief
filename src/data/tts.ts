import type { HomeAssistant } from "../types";

interface TtsGenerateResult {
  url?: string;
  path?: string;
}

/** Tiny silent WAV — unlocks Safari/WebKit audio during the tap gesture. */
const SILENT_WAV =
  "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=";

let activeAudio: HTMLAudioElement | null = null;
let unlockedAudio: HTMLAudioElement | null = null;

function resolveAudioUrl(
  hass: HomeAssistant,
  result: TtsGenerateResult,
): string | null {
  // Prefer path: result.url is often an internal HA URL (e.g. 127.0.0.1 /
  // LAN IP) that the tablet cannot reach through the public hostname.
  const raw = result.path || result.url;
  if (!raw) {
    return null;
  }
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    try {
      const parsed = new URL(raw);
      if (parsed.pathname.startsWith("/api/tts_proxy/")) {
        return parsed.pathname + parsed.search;
      }
    } catch {
      // fall through
    }
    return raw;
  }
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  if (
    typeof (hass as HomeAssistant & { hassUrl?: (p: string) => string })
      .hassUrl === "function"
  ) {
    return (hass as HomeAssistant & { hassUrl: (p: string) => string }).hassUrl(
      path,
    );
  }
  return path;
}

/**
 * Must run synchronously in the click handler — before any await —
 * or iPad Safari will block audio.play() after TTS generation.
 */
export function unlockAudioForGesture(): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    const audio = unlockedAudio ?? new Audio(SILENT_WAV);
    unlockedAudio = audio;
    audio.currentTime = 0;
    void audio.play().then(
      () => {
        audio.pause();
        audio.currentTime = 0;
      },
      () => {
        /* ignore unlock failures; real play will report */
      },
    );
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
}

async function playUrl(url: string): Promise<void> {
  stopSpeaking();
  const audio = unlockedAudio ?? new Audio();
  unlockedAudio = null;
  activeAudio = audio;
  audio.src = url;

  try {
    await audio.play();
  } catch (error) {
    activeAudio = null;
    const message =
      error instanceof Error ? error.message : "audio playback blocked";
    throw new Error(`playback failed: ${message}`);
  }

  await new Promise<void>((resolve, reject) => {
    audio.onended = () => resolve();
    audio.onerror = () =>
      reject(new Error("audio element failed to load TTS stream"));
  });

  if (activeAudio === audio) {
    activeAudio = null;
  }
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
    };
    if (typeof record.message === "string" && record.message.trim()) {
      return record.code ? `${record.code}: ${record.message}` : record.message;
    }
    if (typeof record.error === "string" && record.error.trim()) {
      return record.error;
    }
    try {
      return JSON.stringify(error);
    } catch {
      return "unknown TTS error";
    }
  }
  return "unknown TTS error";
}

/**
 * Prefer Home Assistant TTS engine (e.g. Requesty via OpenAI TTS HACS).
 * Optionally also announce on a media_player.
 * Falls back to browser speechSynthesis.
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
      const result = await options.hass.callWS<TtsGenerateResult>({
        type: "tts/generate",
        engine_id: options.ttsEntity,
        language,
        message: text,
        options: {},
      });
      const url = resolveAudioUrl(options.hass, result);
      if (!url) {
        throw new Error("TTS engine returned no audio URL");
      }
      await playUrl(url);
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
