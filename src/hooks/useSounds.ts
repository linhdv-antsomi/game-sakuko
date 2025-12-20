// Libraries
import { Howl } from "howler";
import { useEffect, useMemo } from "react";

// Sound Effects
import fireworksSound from "assets/sound-effects/fireworks.mp3";
import jingleBells from "assets/sound-effects/jingle-bells.mp3";
import pick from "assets/sound-effects/pick.mp3";
import itemEquip from "assets/sound-effects/item-equip.mp3";
import paper from "assets/sound-effects/paper.mp3";
import scaleD6 from "assets/sound-effects/scaled6.mp3";

export const useSounds = () => {
  const sounds = useMemo(() => {
    return {
      backgroundMusic: new Howl({
        src: [],
        volume: 0.4,
        loop: true,
      }),
      fireworks: new Howl({
        src: [fireworksSound],
        volume: 0.5,
      }),
      jingleBells: new Howl({
        src: [jingleBells],
        volume: 0.5,
      }),
      pick: new Howl({
        src: [pick],
        volume: 0.5,
      }),
      itemEquip: new Howl({
        src: [itemEquip],
        volume: 2,
      }),
      paper: new Howl({
        src: [paper],
        volume: 0.5,
      }),
      scaled6: new Howl({
        src: [scaleD6],
        volume: 0.5,
      }),
    };
  }, []);

  return sounds;
};
