import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  /**
   * The final value to count up to.
   */
  end: number;

  /**
   * The starting value. Defaults to 0.
   */
  start?: number;

  /**
   * Duration of the animation in seconds. Defaults to 1 second.
   */
  duration?: number;

  /**
   * Frames per second (affects smoothness). Defaults to 60.
   */
  fps?: number;

  /**
   * Whether the animation should run. Defaults to true.
   */
  enabled?: boolean;
}

/**
 * Custom React hook for animating a number counting up from `start` to `end`.
 *
 * @param {UseCountUpOptions} options - Configuration for the counter animation.
 * @returns {number} The current animated number value.
 *
 * @example
 * const count = useCountUp({ end: 1000, duration: 2, enabled: isVisible });
 * return <div>{count}</div>;
 */
export function useCountUp({
  end,
  start = 0,
  duration = 1,
  fps = 60,
  enabled = true,
}: UseCountUpOptions): number {
  const [count, setCount] = useState(start);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!enabled) return;

    const totalFrames = Math.round(duration * fps);
    const increment = (end - start) / totalFrames;
    let current = start;
    let frame = 0;

    const update = () => {
      current += increment;
      frame++;

      if (frame < totalFrames) {
        setCount(Math.round(current));
        frameRef.current = requestAnimationFrame(update);
      } else {
        setCount(end);
      }
    };

    cancelAnimationFrame(frameRef.current!);
    frameRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frameRef.current!);
  }, [end, start, duration, fps, enabled]);

  return count;
}
