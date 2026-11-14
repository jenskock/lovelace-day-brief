import type { HomeAssistant } from "../types";

export async function speakSummary(options: {
  hass: HomeAssistant;
  text: string;
  language?: string;
  mediaPlayer?: string;
}): Promise<void> {
  const text = options.text.trim();
  if (!text) {
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
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.language ?? "de-DE";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
    return;
  }

  throw new Error("No TTS available");
}

export function stopSpeaking(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
