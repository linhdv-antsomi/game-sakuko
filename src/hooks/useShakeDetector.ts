import { useEffect, useRef, useState } from "react";

/**
 * Hook to detect shake gestures and trigger callbacks with full control.
 *
 * @param onShake - Called when the required number of shakes is reached
 * @param options - Configuration:
 *  - threshold: sensitivity level to count a shake
 *  - interval: minimum ms between shakes
 *  - requiredShakes: shakes needed to trigger onShake
 *  - resetTimeout: time (ms) to reset count after inactivity
 *  - enabled: whether shake detection is active
 *  - onFirstShake: callback for the very first valid shake
 *  - showPermissionPrompt: whether to auto prompt for motion permission (iOS)
 */
export function useShakeDetector(
  onShake: () => void,
  options?: {
    threshold?: number;
    interval?: number;
    requiredShakes?: number;
    resetTimeout?: number;
    enabled?: boolean;
    onFirstShake?: () => void;
    showPermissionPrompt?: boolean;
  }
) {
  const {
    threshold = 3000,
    interval = 100,
    requiredShakes = 5,
    resetTimeout = 3000,
    enabled = true,
    onFirstShake,
    showPermissionPrompt = true,
  } = options || {};

  const lastTimeRef = useRef(Date.now());
  const lastCoordsRef = useRef({ x: 0, y: 0, z: 0 });
  const shakeCountRef = useRef(0);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [triggered, setTriggered] = useState(false);
  const firstShakeTriggeredRef = useRef(false);

  useEffect(() => {
    if (!enabled || triggered) return;

    function resetShakeCount() {
      shakeCountRef.current = 0;
      firstShakeTriggeredRef.current = false;
      // console.log('⏱ Shake count reset');
    }

    function scheduleReset() {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(resetShakeCount, resetTimeout);
    }

    function handleMotion(event: DeviceMotionEvent) {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      const currentTime = Date.now();
      const timeDiff = currentTime - lastTimeRef.current;

      if (timeDiff > interval) {
        const { x, y, z } = acc;
        const last = lastCoordsRef.current;

        const deltaX = (x || 0) - last.x;
        const deltaY = (y || 0) - last.y;
        const deltaZ = (z || 0) - last.z;

        const speed = (Math.abs(deltaX + deltaY + deltaZ) / timeDiff) * 10000;

        if (speed > threshold) {
          shakeCountRef.current += 1;

          // ⏱ Reset countdown
          scheduleReset();

          // 🚀 Trigger onFirstShake only once
          if (!firstShakeTriggeredRef.current && onFirstShake) {
            firstShakeTriggeredRef.current = true;
            onFirstShake();
          }

          if (shakeCountRef.current >= requiredShakes) {
            setTriggered(true);
            onShake();
          }
        }

        lastTimeRef.current = currentTime;
        lastCoordsRef.current = { x: x || 0, y: y || 0, z: z || 0 };
      }
    }

    const startListening = () => {
      window.addEventListener("devicemotion", handleMotion);
    };

    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof (DeviceMotionEvent as any).requestPermission === "function"
    ) {
      if (showPermissionPrompt) {
        (DeviceMotionEvent as any)
          .requestPermission()
          .then((permission) => {
            if (permission === "granted") startListening();
          })
          .catch(console.error);
      }
    } else {
      startListening();
    }

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [
    onShake,
    onFirstShake,
    threshold,
    interval,
    enabled,
    requiredShakes,
    resetTimeout,
    showPermissionPrompt,
    triggered,
  ]);

  // Reset state when re-enabled
  useEffect(() => {
    if (enabled) {
      shakeCountRef.current = 0;
      firstShakeTriggeredRef.current = false;
      setTriggered(false);
    }
  }, [enabled]);
}
