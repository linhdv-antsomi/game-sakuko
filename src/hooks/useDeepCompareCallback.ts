// Libraries
import { useCallback, useRef } from "react";
import deepEqual from "fast-deep-equal";

/**
 * A custom hook that returns a memoized version of the callback that only changes
 * if one of the dependencies has changed using deep equality comparison.
 *
 * @param {Function} callback - The callback function to be memoized.
 * @param {Array} dependencies - The list of dependencies for the callback.
 * @returns {Function} A memoized version of the callback function.
 */
export function useDeepCompareCallback<T extends (...args: any[]) => any>(
  callback: T,
  dependencies: React.DependencyList
): T {
  const ref = useRef<React.DependencyList>([]);

  if (!deepEqual(ref.current, dependencies)) {
    ref.current = dependencies;
  }

  return useCallback(callback, ref.current);
}
