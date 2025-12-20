// Libraries
import { useEffect, useState } from "react";
import {
  animate,
  MotionValue,
  useMotionValue,
  useTransform,
  ValueAnimationTransition,
} from "motion/react";
import { interpolate } from "flubber";

interface UsePathMorphingProps {
  paths: string[];
  animationOptions?: ValueAnimationTransition<number>;
}

const getIndex = (_: string, index: number) => index;

function useFlubber(progress: MotionValue<number>, paths: string[]) {
  return useTransform(progress, paths.map(getIndex), paths, {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.1 }),
  });
}

export const usePathMorphing = ({
  paths,
  animationOptions,
}: UsePathMorphingProps) => {
  const [pathIndex, setPathIndex] = useState(0);
  const progress = useMotionValue(pathIndex);
  const path = useFlubber(progress, paths);

  useEffect(() => {
    const animation = animate(progress, pathIndex, {
      duration: 1,
      ease: "easeInOut",
      ...animationOptions,
      onComplete: () => {
        if (pathIndex === paths.length - 1) {
          // progress.set(0);
          // setPathIndex(1);
        } else {
          setPathIndex(pathIndex + 1);
        }
      },
    });

    return () => animation.stop();
  }, [animationOptions, pathIndex, paths.length, progress]);

  return {
    path,
  };
};
