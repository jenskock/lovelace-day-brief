/** Tiny valid silent WAV (very short). Reloaded periodically for Silk/Echo Show. */
const SILENT_WAV =
  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";

export class KeepAwakeController {
  private audio?: HTMLAudioElement;
  private timer?: number;
  private active = false;

  isActive(): boolean {
    return this.active;
  }

  start(): boolean {
    if (this.active) {
      return true;
    }
    try {
      const audio = document.createElement("audio");
      audio.setAttribute("playsinline", "true");
      audio.loop = true;
      audio.volume = 0.01;
      audio.src = SILENT_WAV;
      void audio.play();
      this.audio = audio;
      this.active = true;
      this.timer = window.setInterval(() => {
        this.nudge();
      }, 50_000);
      return true;
    } catch {
      this.stop();
      return false;
    }
  }

  nudge(): void {
    if (!this.audio) {
      return;
    }
    try {
      this.audio.src = `${SILENT_WAV}#${Date.now()}`;
      this.audio.currentTime = 0;
      void this.audio.play();
    } catch {
      // Ignore transient play failures.
    }
  }

  stop(): void {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }
    if (this.audio) {
      this.audio.pause();
      this.audio.removeAttribute("src");
      this.audio.load();
      this.audio = undefined;
    }
    this.active = false;
  }
}
