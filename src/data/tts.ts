import type { HomeAssistant } from "../types";

interface TtsGenerateResult {
  url?: string;
  path?: string;
}

function resolveAudioUrl(hass: HomeAssistant, result: TtsGenerateResult): string | null {
  const raw = result.url || result.path;
  if (!raw) {
    return null;
  }
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw;
  }
  const base =
    typeof (hass as HomeAssistant & { hassUrl?: (path: string) => string })
      .hassUrl === "function"
      ? (hass as HomeAssistant & { hassUrl: (path: string) => string }).hassUrl(
          raw.startsWith("/") ? raw : `/${raw}`,
        )
      : raw;
  return base;
}

let activeAudio: HTMLAudioElement | null = null;

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
  const audio = new Audio(url);
  activeAudio = audio;
  await audio.play();
  await new Promise<void>((resolve) => {
    audio.onended = () => resolve();
    audio.onerror = () => resolve();
  });
  if (activeAudio === audio) {
    activeAudio = null;
  }
}

/**
 * Prefer Home Assistant TTS engine (e.g. Requesty via OpenAI TTS HACS).
 * Optionally also announce on a media_player.
 * Falls back to browser speechSynthesis.
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

  const language = options.language ?? "de-DE";

  if (options.ttsEntity) {
    // Play on the dashboard device (Echo Show) via generated audio URL.
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
