// audioManager.ts
export class AudioManager {
  audios = new Set<HTMLAudioElement>();
  mutedByUser = false;
  mutedByApp = false;

  /** Đăng ký audio vào manager */
  register(audio: HTMLAudioElement) {
    this.audios.add(audio);
    (audio as any)._wasPlayingBeforeAppMute = false;
    (audio as any)._wasPlayingBeforeUserMute = false;
  }

  /** Gỡ audio khỏi manager */
  unregister(audio: HTMLAudioElement) {
    this.audios.delete(audio);
  }

  /** User mute tất cả audio */
  muteAllByUser() {
    this.mutedByUser = true;
    this.audios.forEach((a) => {
      console.log("muteAllByUser", { a: !a.paused });
      (a as any)._wasPlayingBeforeUserMute = !a.paused;
      a.pause();
    });
  }

  /** User unmute tất cả audio */
  unmuteAllByUser() {
    this.mutedByUser = false;
    this.audios.forEach((a) => {
      console.log("unmuteAllByUser", {
        a: (a as any)._autoPlayOnUnmute,
        b: (a as any)._wasPlayingBeforeUserMute,
      });
      if (
        (a as any)._autoPlayOnUnmute ||
        (a as any)._wasPlayingBeforeUserMute
      ) {
        a.play().catch(() => {});
      }
      (a as any)._wasPlayingBeforeUserMute = false;
    });
  }

  /** App mute tất cả audio (ví dụ AppPaused) */
  muteAllByApp() {
    this.mutedByApp = true;
    this.audios.forEach((a) => {
      (a as any)._wasPlayingBeforeAppMute = !a.paused;
      a.pause();
    });
  }

  /** App unmute tất cả audio (ví dụ AppResumed) */
  unmuteAllByApp() {
    this.mutedByApp = false;
    if (this.mutedByUser) return; // respect user mute
    this.audios.forEach((a) => {
      if ((a as any)._autoPlayOnUnmute || (a as any)._wasPlayingBeforeAppMute) {
        a.play().catch(() => {});
      }
      (a as any)._wasPlayingBeforeAppMute = false;
    });
  }

  /** Stop và clear tất cả audio */
  destroyAll() {
    this.audios.forEach((a) => {
      a.pause();
      a.currentTime = 0;
      a.src = "";
    });
    this.audios.clear();
  }
}

export const audioManager = new AudioManager();

/** ManagedAudio wrapper cho 1 audio */
export class ManagedAudio {
  audio: HTMLAudioElement;
  ready = false;

  constructor(
    src: string,
    autoPlayOnUnmute = false,
    options?: { loop?: boolean; volume?: number }
  ) {
    this.audio = new Audio(src);
    this.audio.preload = "auto";
    this.audio.loop = options?.loop ?? false;
    this.audio.volume = options?.volume ?? 1;

    (this.audio as any)._autoPlayOnUnmute = autoPlayOnUnmute;

    audioManager.register(this.audio);
  }

  /** iOS cần load sau user gesture */
  init() {
    if (this.ready) return;
    this.audio.load();
    this.ready = true;
  }

  play() {
    if (audioManager.mutedByApp || audioManager.mutedByUser) return;
    this.init(); // đảm bảo iOS load đúng
    this.audio.play().catch(() => {});
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    (this.audio as any)._wasPlayingBeforeAppMute = false;
    (this.audio as any)._wasPlayingBeforeUserMute = false;
  }

  destroy() {
    this.stop();
    audioManager.unregister(this.audio);
    this.audio.src = "";
  }

  isPlaying() {
    return !this.audio.paused;
  }
}
