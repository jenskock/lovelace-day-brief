export type MicTestStatus =
  | "idle"
  | "listening"
  | "denied"
  | "unsupported"
  | "error";

export interface MicTestResult {
  status: MicTestStatus;
  deviceLabel?: string;
  error?: string;
}

/**
 * Tap-to-test microphone access from the dashboard browser.
 * Reports whether getUserMedia works at all (Echo Show / Silk often blocks it)
 * and streams a 0..1 level for the meter while listening.
 */
export class MicTestController {
  private stream?: MediaStream;
  private audioCtx?: AudioContext;
  private raf?: number;
  private active = false;

  isActive(): boolean {
    return this.active;
  }

  async start(onLevel: (level: number) => void): Promise<MicTestResult> {
    this.stop();
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices ||
      typeof navigator.mediaDevices.getUserMedia !== "function"
    ) {
      return { status: "unsupported", error: "no mediaDevices API" };
    }

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
    } catch (err) {
      const name = err instanceof DOMException ? err.name : "";
      if (name === "NotAllowedError" || name === "SecurityError") {
        return { status: "denied", error: name };
      }
      if (name === "NotFoundError" || name === "OverconstrainedError") {
        return { status: "error", error: "no microphone device" };
      }
      return { status: "error", error: name || "getUserMedia failed" };
    }

    const deviceLabel = stream.getAudioTracks()[0]?.label || undefined;

    try {
      const Ctx =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctx) {
        this._stopStream(stream);
        return { status: "unsupported", error: "no AudioContext" };
      }
      const ctx = new Ctx();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      const data = new Uint8Array(analyser.fftSize);

      this.stream = stream;
      this.audioCtx = ctx;
      this.active = true;

      const loop = () => {
        if (!this.active) {
          return;
        }
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          const v = (data[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / data.length);
        onLevel(Math.min(1, rms * 3));
        this.raf = requestAnimationFrame(loop);
      };
      this.raf = requestAnimationFrame(loop);
      return { status: "listening", deviceLabel };
    } catch (err) {
      this.stop();
      return {
        status: "error",
        error: err instanceof Error ? err.message : "audio analysis failed",
      };
    }
  }

  stop(): void {
    this.active = false;
    if (this.raf !== undefined) {
      cancelAnimationFrame(this.raf);
      this.raf = undefined;
    }
    if (this.audioCtx) {
      void this.audioCtx.close().catch(() => undefined);
      this.audioCtx = undefined;
    }
    if (this.stream) {
      this._stopStream(this.stream);
      this.stream = undefined;
    }
  }

  private _stopStream(stream: MediaStream): void {
    for (const track of stream.getTracks()) {
      track.stop();
    }
  }
}
