import { useState, useEffect, useCallback, useRef } from "react";

// Define the scroll information shape
export interface ScrollInfo {
  scrollY: number; // Vertical scroll position
  scrollX: number; // Horizontal scroll position
  isScrolled: boolean; // Whether scroll exceeds threshold
  direction: "up" | "down" | "left" | "right" | "none"; // Scroll direction
  maxScrollY: number; // Maximum vertical scrollable distance
  maxScrollX: number; // Maximum horizontal scrollable distance
  scrollPercentY: number; // Vertical scroll percentage (0-100)
  scrollPercentX: number; // Horizontal scroll percentage (0-100)
}

// Define possible target types (HTMLElement or RefObject)
type ScrollTarget = HTMLElement | React.RefObject<HTMLElement>;

// Options for the hook
interface UseScrollOptions {
  target?: ScrollTarget; // Target can be an HTMLElement or RefObject (optional, required if useWindow is false)
  threshold?: number; // Scroll threshold to toggle isScrolled (default: 50)
  useWindow?: boolean; // Use window instead of a specific element (default: false)
  onScroll?: (info: ScrollInfo) => void; // Callback when scroll occurs
  debounceTime?: number; // Debounce time in milliseconds (default: 0)
}

// Return type of the hook
type UseScrollReturn = ScrollInfo;

/**
 * Flexible hook to track scrolling behavior for either window or a custom target
 * @param options Configuration options including an optional target (HTMLElement or RefObject)
 * @returns Scroll state
 */
export function useScroll({
  target,
  threshold = 50,
  useWindow = false,
  onScroll = undefined,
  debounceTime = 0,
}: UseScrollOptions = {}): UseScrollReturn {
  // State to store all scroll-related information
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({
    scrollY: 0,
    scrollX: 0,
    isScrolled: false,
    direction: "none",
    maxScrollY: 0,
    maxScrollX: 0,
    scrollPercentY: 0,
    scrollPercentX: 0,
  });

  // Refs to track previous scroll positions for direction detection
  const prevScrollY = useRef<number>(0);
  const prevScrollX = useRef<number>(0);

  // Debounce utility to limit the frequency of updates
  const debounce = (func: () => void, wait: number): (() => void) => {
    let timeout: NodeJS.Timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    };
  };

  // Resolve the target element based on input
  const getTargetElement = useCallback((): HTMLElement | Window | null => {
    if (useWindow) return window;
    if (!target) return null;
    return "current" in target ? target.current : target; // Handle RefObject vs HTMLElement
  }, [target, useWindow]);

  // Handle scroll logic
  const handleScroll = useCallback(() => {
    const scrollTarget = getTargetElement();

    if (!scrollTarget) return;

    // Get scroll positions and dimensions
    const scrollY = useWindow
      ? window.scrollY
      : (scrollTarget as HTMLElement).scrollTop;
    const scrollX = useWindow
      ? window.scrollX
      : (scrollTarget as HTMLElement).scrollLeft;
    const maxScrollY = useWindow
      ? document.documentElement.scrollHeight - window.innerHeight
      : (scrollTarget as HTMLElement).scrollHeight -
        (scrollTarget as HTMLElement).clientHeight;
    const maxScrollX = useWindow
      ? document.documentElement.scrollWidth - window.innerWidth
      : (scrollTarget as HTMLElement).scrollWidth -
        (scrollTarget as HTMLElement).clientWidth;

    // Calculate scroll percentages
    const scrollPercentY = maxScrollY > 0 ? (scrollY / maxScrollY) * 100 : 0;
    const scrollPercentX = maxScrollX > 0 ? (scrollX / maxScrollX) * 100 : 0;

    // Determine scroll direction
    let direction: ScrollInfo["direction"] = "none";
    if (scrollY > prevScrollY.current) direction = "down";
    else if (scrollY < prevScrollY.current) direction = "up";
    if (scrollX > prevScrollX.current) direction = "right";
    else if (scrollX < prevScrollX.current) direction = "left";

    // Update scroll info
    const newScrollInfo: ScrollInfo = {
      scrollY,
      scrollX,
      isScrolled: scrollY > threshold,
      direction,
      maxScrollY,
      maxScrollX,
      scrollPercentY: Number(scrollPercentY.toFixed(2)),
      scrollPercentX: Number(scrollPercentX.toFixed(2)),
    };
    setScrollInfo(newScrollInfo);

    // Call the optional onScroll callback
    if (onScroll) onScroll(newScrollInfo);

    // Update previous scroll positions
    prevScrollY.current = scrollY;
    prevScrollX.current = scrollX;
  }, [threshold, useWindow, onScroll, getTargetElement]);

  // Set up scroll listener
  useEffect(() => {
    const scrollTarget = getTargetElement();

    if (!scrollTarget) return;

    // Apply debounce if specified
    const scrollHandler =
      debounceTime > 0 ? debounce(handleScroll, debounceTime) : handleScroll;
    scrollTarget.addEventListener("scroll", scrollHandler);

    // Initialize scroll info on mount
    handleScroll();

    // Cleanup listener on unmount
    return () => scrollTarget.removeEventListener("scroll", scrollHandler);
  }, [handleScroll, useWindow, debounceTime, getTargetElement]);

  // Return scroll info only
  return scrollInfo;
}
