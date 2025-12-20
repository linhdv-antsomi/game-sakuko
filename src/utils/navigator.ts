export const getOSInfo = () => {
  const userAgent = navigator.userAgent;

  let os: "iOS" | "Android" | null = null;
  let version: number | null = 0;

  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    os = "iOS";
    const match = userAgent.match(/OS (\d+)_/);
    version = match ? parseInt(match[1], 10) : null;
  } else if (/Android/i.test(userAgent)) {
    os = "Android";
    const match = userAgent.match(/Android (\d+)\./);
    version = match ? parseInt(match[1], 10) : null;
  }

  return {
    os,
    version,
  };
};

/**
 * Copies the provided text to the user's clipboard.
 * Uses the modern Clipboard API when available, with fallback to execCommand for older browsers.
 *
 * @param text - The text to be copied to the clipboard
 * @param options - Optional configuration object
 * @param options.onSuccess - Callback function executed on successful copy
 * @param options.onError - Callback function executed if copy fails
 * @returns Promise resolving with true if copy succeeds, false otherwise
 *
 * @example
 * // Basic usage
 * copyToClipboard('Hello World')
 *   .then((success) => {
 *     if (success) console.log('Text copied!');
 *   });
 *
 * @example
 * // With options and callbacks
 * copyToClipboard('Hello World', {
 *   onSuccess: () => alert('Copied successfully!'),
 *   onError: (error) => console.error('Copy failed:', error)
 * })
 *   .then((success) => {
 *     console.log('Copy operation', success ? 'succeeded' : 'failed');
 *   });
 */
export const copyToClipboard = async (
  text: string,
  options: {
    onSuccess?: () => void;
    onError?: (error: string | Error) => void;
  } = {}
): Promise<boolean> => {
  const { onSuccess, onError } = options;

  // Validate input
  if (typeof text !== "string" || text.length === 0) {
    onError?.("Invalid input: Text must be a non-empty string");
    return false;
  }

  try {
    // Modern Clipboard API (preferred method)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      onSuccess?.();
      return true;
    }

    // Fallback for older browsers
    const textArea: HTMLTextAreaElement = document.createElement("textarea");
    textArea.value = text;

    // Prevent keyboard from showing on mobile
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful: boolean = document.execCommand("copy");
    document.body.removeChild(textArea);

    if (successful) {
      onSuccess?.();
      return true;
    } else {
      throw new Error("Copy command failed");
    }
  } catch (error) {
    onError?.(error instanceof Error ? error : new Error(String(error)));
    return false;
  }
};
