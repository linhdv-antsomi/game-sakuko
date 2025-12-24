import { CollectionItem } from "schemas";
import { BOX_CONFIG } from "./constants";

/**
 * Get box width from CSS variable
 */
export const getBoxWidth = (elm?: HTMLElement): number => {
  return (
    parseFloat(
      getComputedStyle(elm || document.documentElement).getPropertyValue(
        BOX_CONFIG.WIDTH_VAR
      )
    ) || BOX_CONFIG.DEFAULT_WIDTH
  );
};

/**
 * Get box height from CSS variable
 */
export const getBoxHeight = (elm?: HTMLElement): number => {
  return (
    parseFloat(
      getComputedStyle(elm || document.documentElement).getPropertyValue(
        BOX_CONFIG.HEIGHT_VAR
      )
    ) || BOX_CONFIG.DEFAULT_HEIGHT
  );
};

/**
 * Clamp a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * Generate random number between min and max
 */
export const randomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Get random item from array
 */
export const randomItem = <T>(array: readonly T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Format time in seconds to display format
 */
export const formatTime = (seconds: number): string => {
  return seconds.toFixed(1);
};

export function buildWeightedTable(items: CollectionItem[]) {
  let sum = 0;
  const table = items.map((item) => {
    sum += item.rateSpawn;
    return { item, cumulative: sum };
  });
  return { table, totalRate: sum };
}

export function pickWeightedRandom(table) {
  if (!table) return null;
  const r = Math.random() * table.totalRate;

  let left = 0;
  let right = table.table.length - 1;

  while (left < right) {
    const mid = (left + right) >> 1;
    if (r <= table.table[mid].cumulative) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return table.table[left].item;
}
