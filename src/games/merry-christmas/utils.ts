import { ManagedAudio } from "utils";
import bgChristmasMP3 from "assets/sound-effects/christmas.mp3";

export const bgChristmasMusic = new ManagedAudio(bgChristmasMP3, false, { volume: 0.2, loop: true });