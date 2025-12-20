import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useState } from "react";
import { useDeepCompareEffect } from "./useDeepCompareEffect";

dayjs.extend(utc);
dayjs.extend(timezone);

type CountdownType = "static" | "dynamic";

interface BaseCountdown {
  countdownType: CountdownType;
  /**
   * Optional prefix for localStorage key (used in dynamic countdowns).
   * Useful to avoid key collisions when using this hook multiple times.
   */
  storageKeyPrefix?: string;
}

interface StaticCountdown extends BaseCountdown {
  countdownType: "static";
  endDate: string;
  endTime: string;
  epoch: number;
  timeZone?: string;
}

interface DynamicCountdown extends BaseCountdown {
  countdownType: "dynamic";
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  timeInSeconds: number;
  isRepeat?: boolean;
}

type CountdownConfig = StaticCountdown | DynamicCountdown;

export interface CountdownResult {
  days: number;
  hours: string;
  minutes: string;
  seconds: string;
  isCompleted: boolean;
}

/**
 * Returns the current user's timezone using the browser API.
 */
const getUserTimeZone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

/**
 * Builds the localStorage key based on a prefix.
 *
 * @param prefix A string to avoid key collisions in localStorage
 * @returns Local storage key for the countdown
 */
const getStorageKey = (prefix?: string): string =>
  `${prefix ?? "countdown"}_dynamic_start`;

const getConfigStorageKey = (prefix?: string): string =>
  `${prefix ?? "countdown"}_config`;

/**
 * Retrieves or initializes the start time for a dynamic countdown from localStorage.
 *
 * @param storageKey The localStorage key
 */
const getInitialStartTime = (storageKey: string): dayjs.Dayjs => {
  const stored = localStorage.getItem(storageKey);
  const now = dayjs();
  if (stored) return dayjs(stored);
  localStorage.setItem(storageKey, now.toISOString());
  return now;
};

/**
 * Pads a number with leading zeros.
 *
 * @param n The number to pad
 */
const pad = (n: number): string => String(n).padStart(2, "0");

/**
 * A React hook for managing countdown timers with support for:
 * - Static target date/time with optional timezone.
 * - Dynamic countdowns that can optionally repeat when completed.
 *
 * @param {CountdownConfig} config - Countdown configuration
 * @returns {CountdownResult} Remaining time in days, hours, minutes, seconds and completion flag
 */
export const useCountdown = (config: CountdownConfig): CountdownResult => {
  const storageKey = getStorageKey(config.storageKeyPrefix);
  const configStorageKey = getConfigStorageKey(config.storageKeyPrefix);

  // Calculates the initial time remaining in seconds
  const calculateInitialSeconds = (): number => {
    if (config.countdownType === "static") {
      const timeZone = config.timeZone?.trim() || getUserTimeZone();
      const now = dayjs().tz(timeZone);
      const end = dayjs(config.epoch).tz(timeZone);
      return Math.max(end.diff(now, "second"), 0);
    }

    const start = getInitialStartTime(storageKey);
    const end = start.add(config.timeInSeconds, "second");
    return Math.max(end.diff(dayjs(), "second"), 0);
  };

  const [remainingSeconds, setRemainingSeconds] = useState<number>(
    calculateInitialSeconds
  );

  /**
   * Compare the current configuration with the stored config in localStorage
   * to determine if we need to reset the countdown.
   */
  const checkAndResetConfig = () => {
    const currentConfig = JSON.stringify(config);
    const storedConfig = localStorage.getItem(configStorageKey);

    // If the config is not fully then do no thing
    if (Object.keys(config).length <= 2) {
      return false;
    }

    if (storedConfig !== currentConfig) {
      localStorage.setItem(configStorageKey, currentConfig);
      localStorage.removeItem(storageKey); // Reset countdown if the config changes
      return true; // Config changed, reset countdown
    }
    return false; // Config is the same, no reset needed
  };

  useDeepCompareEffect(() => {
    const configChanged = checkAndResetConfig();

    if (configChanged || remainingSeconds <= 0) {
      setRemainingSeconds(calculateInitialSeconds());
    }

    const interval = setInterval(() => {
      if (config.countdownType === "static") {
        const timeZone = config.timeZone?.trim() || getUserTimeZone();
        const now = dayjs().tz(timeZone);
        const end = dayjs(config.epoch).tz(timeZone);
        const diff = Math.max(end.diff(now, "second"), 0);
        setRemainingSeconds(diff);
      } else {
        const stored = localStorage.getItem(storageKey);
        const start = stored ? dayjs(stored) : dayjs();
        const now = dayjs();
        const end = start.add(config.timeInSeconds, "second");
        let diff = end.diff(now, "second");

        if (diff <= 0) {
          if (config.isRepeat) {
            const newStart = now;
            localStorage.setItem(storageKey, newStart.toISOString());
            diff = config.timeInSeconds;
          } else {
            diff = 0;
          }
        }

        setRemainingSeconds(Math.max(diff, 0));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [config, storageKey, remainingSeconds]);

  const formatTime = (seconds: number): CountdownResult => {
    const days = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds % (60 * 60 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return {
      days,
      hours: pad(isNaN(hours) ? 0 : hours),
      minutes: pad(isNaN(minutes) ? 0 : minutes),
      seconds: pad(isNaN(secs) ? 0 : secs),
      isCompleted: seconds === 0,
    };
  };

  return formatTime(remainingSeconds);
};
