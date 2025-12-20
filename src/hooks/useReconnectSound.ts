// Libraries
import { useEffect } from "react";
import { Howler } from "howler";

/**
 * A hook that handles reconnecting sound when the page visibility changes.
 *
 * This hook adds an event listener to the document's visibilitychange event,
 * and resumes the Howler audio context when the document becomes visible again.
 * This is useful for handling audio playback issues that can occur when a user
 * switches tabs or minimizes the browser and then returns to the page.
 *
 * @returns void
 *
 * @example
 * // In a component
 * function MyComponent() {
 *   useReconnectSound();
 *
 *   // rest of the component
 * }
 */
export const useReconnectSound = () => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      const { ctx } = Howler;
      if (ctx && !document.hidden) {
        setTimeout(() => {
          ctx.resume();
        }, 100);
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
      false
    );

    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
        false
      );
    };
  }, []);
};
