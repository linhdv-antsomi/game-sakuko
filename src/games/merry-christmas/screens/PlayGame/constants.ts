import { ItemType, Scores } from "./types";
import { CollectionItem } from "schemas";

// Assets
import item1Img from "assets/images/catch-rewards/item-1.webp";
import item2Img from "assets/images/catch-rewards/item-2.webp";
import item3Img from "assets/images/catch-rewards/item-3.webp";
import item4Img from "assets/images/catch-rewards/item-4.webp";
import item5Img from "assets/images/catch-rewards/item-5.webp";
import item6Img from "assets/images/catch-rewards/item-6.webp";
import item7Img from "assets/images/catch-rewards/item-7.webp";
import item8Img from "assets/images/catch-rewards/item-8.webp";

/**
 * Create item types from collections
 */
export const createItemTypesFromCollections = (
  collections: CollectionItem[] = []
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
 * Create initial score template from collections
 */
export const createScoreTemplate = (
  collections: CollectionItem[] = []
): Scores => {
  const scores: Scores = {};
  collections.forEach((collection) => {
    scores[collection.id] = 0;
  });
  return scores;
};

export const getTotalScore = (scores: Scores, collections: CollectionItem[]): number => {
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
  DURATION_SECONDS: 15,
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
  DEFAULT_WIDTH: 191,
  DEFAULT_HEIGHT: 99,
});

export const COLLECTTIONS: CollectionItem[] = [
  {
    id: "1",
    title: "Thẻ giảm giá",
    type: "plus-score",
    value: 20,
    rateSpawn: 0.3333,
    itemImage: item1Img,
    scoreImage: item1Img,
  },
  {
    id: "2",
    title: "Sữa meji",
    type: "plus-score",
    value: 60,
    rateSpawn: 0.0889,
    itemImage: item4Img,
    scoreImage: item4Img,
  },
  {
    id: "3",
    title: "Mì chính Ajinomoto",
    type: "plus-score",
    value: 50,
    rateSpawn: 0.1111,
    itemImage: item2Img,
    scoreImage: item2Img,
  },
  {
    id: "4",
    title: "Thực phẩm chức năng ikimoto",
    type: "plus-score",
    value: 50,
    rateSpawn: 0.1111,
    itemImage: item3Img,
    scoreImage: item3Img,
  },
  {
    id: "5",
    title: "Mỹ phẩm chống nắng Anessa",
    type: "plus-score",
    value: 50,
    rateSpawn: 0.1111,
    itemImage: item5Img,
    scoreImage: item5Img,
  },
  {
    id: "6",
    title: "Đồng hồ",
    type: "plus-time",
    value: 5,
    rateSpawn: 0.0444,
    itemImage: item6Img,
    scoreImage: item6Img,
  },
  {
    id: "7",
    title: "Đá tảng",
    type: "stun",
    value: 1.25,
    rateSpawn: 0.0667,
    itemImage: item7Img,
    scoreImage: item7Img,
  },
  {
    id: "8",
    title: "Boom",
    type: "minus-score",
    value: 50,
    rateSpawn: 0.1333,
    itemImage: item8Img,
    scoreImage: item8Img,
  },
];
