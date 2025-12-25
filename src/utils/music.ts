// Libraries
import { Howl } from "howler";

// Musics
import bgMP3 from "assets/sound-effects/FastFeelBananaPeel.mp3";

export const bgMusic = new Howl({
  src: [bgMP3],
  volume: 0.4,
  loop: true,
  preload: true,
  html5: false,
});