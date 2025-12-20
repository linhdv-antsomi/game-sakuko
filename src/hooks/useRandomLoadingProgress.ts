import { useEffect, useRef, useState } from "react";

/**
 * A custom hook that simulates a random loading progress from 0% to 100%.
 * If `externalIsDone` is false, progress will only go up to 90%.
 * Once `externalIsDone` becomes true, it will finish to 100%.
 *
 * @param duration - Total loading duration **in seconds**.
 * @param autoStart - Whether to start the loading automatically (default: true).
 * @param externalIsDone - External trigger to complete loading to 100%.
 * @returns An object containing:
 * - `progress`: current loading progress (0 to 100, integer).
 * - `start()`: manually start the loading (only needed if `autoStart` is false).
 * - `reset()`: reset the loading back to 0%.
 */
export function useRandomLoadingProgress({
  duration,
  autoStart = true,
  externalIsDone = false,
}: {
  duration: number; // in seconds
  autoStart?: boolean;
  externalIsDone?: boolean;
}) {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentRef = useRef(0);

  const interval = 100; // ms per tick
  const steps = (duration * 1000) / interval; // convert seconds to ms-based steps

  const start = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      const isFinalStage = externalIsDone;
      const maxTarget = isFinalStage ? 100 : 90;

      const remaining = maxTarget - currentRef.current;
      const maxIncrease = remaining / (steps * 0.5);
      const increase = Math.random() * maxIncrease;

      currentRef.current = Math.min(currentRef.current + increase, maxTarget);
      const rounded = Math.round(currentRef.current); // 💥 round down to nearest integer

      setProgress(rounded);

      if (rounded >= 100) {
        clearInterval(timerRef.current!);
        timerRef.current = null;
      }
    }, interval);
  };

  const reset = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    currentRef.current = 0;
    setProgress(0);
  };

  useEffect(() => {
    if (autoStart) start();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (externalIsDone && currentRef.current < 100 && !timerRef.current) {
      start();
    }
  }, [externalIsDone]);

  return { progress, start, reset };
}
