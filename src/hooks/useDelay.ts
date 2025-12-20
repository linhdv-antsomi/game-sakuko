import { useState } from "react";
import { useTimeout } from "usehooks-ts";

export function useDelay(delay: number = 1000): boolean {
  const [isReady, setIsReady] = useState(false);

  useTimeout(() => {
    setIsReady(true);
  }, delay);

  return isReady;
}
