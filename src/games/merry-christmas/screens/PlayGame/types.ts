import { ChristmasItem } from "schemas";

/**
 * Item type definition for falling objects
 */
export interface ItemType {
  key: string;
  label: string;
  image: string;
  scoreImage?: string;
  emoji?: string;
  tint: string;
  sizeRange: [number, number];
  speedRange: [number, number];
  type: ChristmasItem["type"];
  value: ChristmasItem["value"];
}

/**
 * Falling item instance
 */
export interface FallingItem {
  el: HTMLDivElement;
  type: ItemType;
  x: number;
  y: number;
  size: number;
  speed: number;
  horizontalSpeed: number; // Tốc độ ngang (trái/phải)
  swingAmplitude: number; // Biên độ dao động
  swingFrequency: number; // Tần số dao động
  swingPhase: number; // Pha ban đầu
}

/**
 * Score tracking object - dynamic based on collections
 */
export interface Scores {
  [collectionId: string]: number;
}

/**
 * Game statistics
 */
export interface GameStats {
  scores: Scores;
  totalScore: number;
  fallingCount: number;
  timeLeft: number;
  isGameOver: boolean;
  restart: () => void;
}
