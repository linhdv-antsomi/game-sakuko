import { PlayGameResponse } from "schemas";
import { SCREEN_KEYS } from "./constants";
import { atom } from "recoil";
import { Scores } from "./screens/PlayGame/types";

export type MerryChristmasScreen = (typeof SCREEN_KEYS)[keyof typeof SCREEN_KEYS];

type MerryChristmasStateType = {
  /** Current active screen */
  currentScreen: MerryChristmasScreen;
  isGameLoading?: boolean;
  isAllocatingCode?: boolean;
  isPlaying?: boolean;
  showResultsScreen?: boolean;
  allocateVoucher?: PlayGameResponse;
  scores?: Scores;
  totalScore?: number;
};

export const merryChristmasStateDefault: MerryChristmasStateType = {
  isGameLoading: false,
  currentScreen: SCREEN_KEYS.MAIN_MENU,
  isPlaying: false,
  showResultsScreen: false,
  isAllocatingCode: false,
  allocateVoucher: undefined,
  scores: undefined,
  totalScore: undefined,
};

export const merryChristmasState = atom<MerryChristmasStateType>({
  key: "merryChristmasState",
  default: merryChristmasStateDefault,
});
