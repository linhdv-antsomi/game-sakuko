import { ItemType, Scores } from "./types";
import { ChristmasItem } from "schemas";

// Assets
import itemTShirt from "assets/images/merry-christmas/item-t-shirt.webp";
import itemTrousers from "assets/images/merry-christmas/item-trouser.webp";
import itemLongShirt from "assets/images/merry-christmas/item-long-shirt.webp";
import itemPerfume from "assets/images/merry-christmas/item-perfume.webp";
import itemBelt from "assets/images/merry-christmas/item-belt.webp";
import itemJacket from "assets/images/merry-christmas/item-jacket.webp";
import itemRock from "assets/images/merry-christmas/item-rock.webp";
import itemTime from "assets/images/merry-christmas/item-time.webp";

import scoreTShirt from "assets/images/merry-christmas/score-t-shirt.webp";
import scoreTrousers from "assets/images/merry-christmas/score-trouser.webp";
import scoreLongShirt from "assets/images/merry-christmas/score-long-shirt.webp";
import scorePerfume from "assets/images/merry-christmas/score-perfume.webp";
import scoreBelt from "assets/images/merry-christmas/score-belt.webp";
import scoreJacket from "assets/images/merry-christmas/score-jacket.webp";
import scoreRock from "assets/images/merry-christmas/score-rock.webp";
import scoreTime from "assets/images/merry-christmas/score-time.webp";

/**
 * Create item types from collections
 */
export const createItemTypesFromCollections = (
  collections: ChristmasItem[] = []
): ItemType[] => {
  return collections.map((collection, index) => ({
    key: collection.id,
    label: collection.title || `Collection ${index + 1}`,
    image: collection.itemImage || "",
    scoreImage: collection.scoreImage || "",
    tint: `rgba(${50 + index * 40}, ${200 - index * 20}, ${
      255 - index * 30
    }, 0.35)`,
    sizeRange: [65, 73] as [number, number],
    speedRange: [260 + index * 15, 300 + index * 15] as [number, number],
    type: collection.type,
    value: collection.value,
  }));
};

/**
 * Default item types (fallback if no collections)
 */
// export const DEFAULT_ITEM_TYPES: readonly ItemType[] = Object.freeze([
//   {
//     key: "default-1",
//     label: "Tia sáng",
//     image: "",
//     tint: "rgba(255, 215, 90, 0.35)",
//     sizeRange: [46, 58],
//     speedRange: [180, 260],
//   },
// ]);

/**
 * Create initial score template from collections
 */
export const createScoreTemplate = (
  collections: ChristmasItem[] = []
): Scores => {
  const scores: Scores = {};
  collections.forEach((collection) => {
    scores[collection.id] = 0;
  });
  return scores;
};

export const getTotalScore = (scores: Scores, collections: ChristmasItem[]): number => {
  let total = 0;

  for (const item of collections) {
    const baseScore = scores[item.id] ?? 0;     // điểm của loại item theo id
    const value = Number(item.value) || 0;       // bảo đảm là number

    switch (item.type) {
      case "plus-score":
        total += baseScore * value;
        break;

      case "minus-score":
        total -= baseScore * value;
        break;

      default:
        // plus-time hoặc các loại không ảnh hưởng điểm
        break;
    }
  }

  return total;
};

/**
 * Game configuration constants
 *
 * @property DURATION_SECONDS - Total game duration in seconds (default: 15s)
 * @property BASE_SPEED_GROWTH - Base multiplier for speed increase over time (0.035 = 3.5% growth)
 * @property SPEED_MULTIPLIER_MAX - Maximum speed multiplier cap (2.5x the base speed)
 * @property SPAWN_INTERVAL_START - Initial delay between item spawns in milliseconds (900ms at game start)
 * @property SPAWN_INTERVAL_END - Minimum delay between item spawns in milliseconds (200ms at game end, spawns faster)
 * @property SPAWN_ACCELERATION_EXPONENT - Controls how quickly spawn rate increases (higher = faster acceleration curve)
 * @property SPEED_ACCELERATION_EXPONENT - Controls how quickly items fall faster over time (higher = faster acceleration curve)
 * @property COUNTDOWN_START - Starting number for countdown before game starts (3-2-1)
 */
export const GAME_CONFIG = Object.freeze({
  DURATION_SECONDS: 30,
  BASE_SPEED_GROWTH: 0.2,
  SPEED_MULTIPLIER_MAX: 3,
  SPAWN_INTERVAL_START: 900,
  SPAWN_INTERVAL_END: 200,
  SPAWN_ACCELERATION_EXPONENT: 2,
  SPEED_ACCELERATION_EXPONENT: 2,
  COUNTDOWN_START: 3,

  BASE_SPAWN_INTERVAL: 800,  // 0.8s spawn item
  SPEED_INCREASE_INTERVAL: 10, // mỗi 15s tăng tốc độ rơi
  SPEED_INCREASE_PERCENT: 0.2, // tăng 20%
});
/**
 * Box dimensions (CSS variables)
 */
export const BOX_CONFIG = Object.freeze({
  WIDTH_VAR: "--box-width",
  HEIGHT_VAR: "--box-height",
  DEFAULT_WIDTH: 150,
  DEFAULT_HEIGHT: 150,
});

export const COLLECTTIONS: ChristmasItem[] = [
  {
    id: "1",
    title: "Áo",
    type: "plus-score",
    value: 10,
    rateSpawn: 0.17,
    itemImage: itemTShirt,
    scoreImage: scoreTShirt,
  },
  {
    id: "2",
    title: "Quần dài",
    type: "plus-score",
    value: 10,
    rateSpawn: 0.15,
    itemImage: itemTrousers,
    scoreImage: scoreTrousers,
  },
  {
    id: "3",
    title: "Áo dài tay",
    type: "plus-score",
    value: 10,
    rateSpawn: 0.15,
    itemImage: itemLongShirt,
    scoreImage: scoreLongShirt,
  },
  {
    id: "4",
    title: "Thắt lưng",
    type: "plus-score",
    value: 20,
    rateSpawn: 0.10,
    itemImage: itemBelt,
    scoreImage: scoreBelt,
  },
  {
    id: "5",
    title: "Áo khoác",
    type: "plus-score",
    value: 20,
    rateSpawn: 0.10,
    itemImage: itemJacket,
    scoreImage: scoreJacket,
  },
  {
    id: "6",
    title: "Nước hoa",
    type: "plus-score",
    value: 20,
    rateSpawn: 0.10,
    itemImage: itemPerfume,
    scoreImage: scorePerfume,
  },
  {
    id: "7",
    title: "Đá",
    type: "minus-score",
    value: 25,
    rateSpawn: 0.18,
    itemImage: itemRock,
    scoreImage: scoreRock,
  },
  {
    id: "8",
    title: "Thời gian",
    type: "plus-time",
    value: 2,
    rateSpawn: 0.05,
    itemImage: itemTime,
    scoreImage: scoreTime,
  },
];
