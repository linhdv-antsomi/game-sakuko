// Libraries
import { useEffect, useRef } from "react";
import fastCompare from "fast-deep-equal";

export function useDeepCompareEffect(
  effect: React.EffectCallback,
  dependencies: React.DependencyList
) {
  const ref = useRef<React.DependencyList>([]);

  if (!fastCompare(ref.current, dependencies)) {
    ref.current = dependencies;
  }

  useEffect(effect, ref.current);
}
