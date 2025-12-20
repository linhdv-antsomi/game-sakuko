/**
 * useEffectAfterDepsUpdate - Executes the callback after all dependencies have been updated.
 * @param callback - The callback function to be executed after all dependencies have changed.
 * @param dependencies - The list of dependencies to watch for changes.
 */
import { useEffect, useRef } from "react";

function useEffectAfterDepsUpdate(
  callback: () => void,
  dependencies: any[]
): void {
  const hasMounted = useRef<boolean>(false);
  const prevDeps = useRef<any[]>(dependencies);

  useEffect(() => {
    // If not mounted yet, mark as mounted and do not execute callback
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    // Check if all dependencies have changed
    const allDepsChanged = prevDeps.current.every(
      (dep, i) => dep !== dependencies[i]
    );

    if (allDepsChanged) {
      callback();
    }

    // Update previous dependencies
    prevDeps.current = dependencies;
  }, [callback, dependencies]);
}

export default useEffectAfterDepsUpdate;
