import { Utm } from "schemas";
import { getSearchParamsAsObject } from "./browser";

interface CallCdpEventParams {
  ea?: string;
  ec?: string;
  data?: any;
  uId?: string;
  dims?: Record<string, any>;
  items?: Record<string, any>[];
  propId?: number;
  delay?: number;
}

interface TrackFacebookPixelParams {
  method?: "track" | "trackCustom";
  eventName: string;
  params?: Record<string, any>;
}

/**
 * Sends a tracking event to the web_event if available.
 *
 * @param {CallCdpEventParams} params - The parameters to be sent with the event.
 */

export const callCdpEvent = (params: CallCdpEventParams) => {
  const { web_event } = window as any;
  const { utm_type } = getSearchParamsAsObject<Utm>();
  // Ignore in development
  if (process.env.NODE_ENV === "development") {
    return;
  }

  const {
    ec = "pageview",
    ea = "view",
    data,
    uId,
    dims,
    items = [],
    delay,
  } = params;

  const postEvent = () => {
    if (web_event && typeof web_event.track === "function") {
      web_event.track(ec, ea, {
        custom_event: 1,
        dims: {
          ...dims,
          users: {
            ...dims?.users,
            user_id: uId,
          },
        },
        extra: {
          ...data,
          utm_channel: utm_type,
        },
        items,
      });
    }
  };

  setTimeout(postEvent, delay || 0);
};

export function trackFacebookPixel({
  method = "trackCustom",
  eventName,
  params,
}: TrackFacebookPixelParams): void {
  if (typeof window === "undefined") return;

  if (typeof window.fbq !== "function") {
    console.warn("[Facebook Pixel] fbq is not initialized");
    return;
  }

  try {
    if (params) {
      window.fbq(method, eventName, params);
    } else {
      window.fbq(method, eventName);
    }

    // Optional debug log
    console.info(`[Facebook Pixel] Event sent: ${eventName}`, params ?? {});
  } catch (error) {
    console.error("[Facebook Pixel] Failed to send event:", error);
  }
}

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq?: any;
  }
}

export {}; // This empty export makes the file a module
