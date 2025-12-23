// PreviewModeBootstrap.tsx
import { memo, useEffect, useRef } from "react";
import { PREVIEW_WINDOW_VARS } from "./config";
import { ensureZma } from "./utils";

const PREVIEW_MODE_KEY = "mode";
const PREVIEW_MODE_VAL = "preview";

function usePreviewWindowVars() {
  const injectedRef = useRef(false);

  useEffect(() => {
    if (injectedRef.current) return;

    const params = new URLSearchParams(window.location.search);
    const isPreview = params.get(PREVIEW_MODE_KEY) === PREVIEW_MODE_VAL;

    if (!isPreview) return;

    const zma = ensureZma();
    if (!zma) return;

    Object.entries(PREVIEW_WINDOW_VARS).forEach(([key, value]) => {
      // tránh overwrite nếu đã tồn tại
      if (!(key in zma)) {
        // @ts-ignore
        zma[key] = value;
      }
    });

    injectedRef.current = true;

    if (isPreview) {
      console.info("[PreviewMode] window vars injected");
    }
  }, []);
}

export const PreviewMode = memo(() => {
  usePreviewWindowVars();
  return null;
});

PreviewMode.displayName = "PreviewMode";

declare global {
  interface Window {
    zma: Record<string, any>;
  }
}
