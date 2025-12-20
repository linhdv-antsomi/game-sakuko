// Libraries
import { APP_CONFIG } from "constant";
import { useEffect } from "react";

export const useInitFacebookPixel = () => {
  useEffect(() => {
    // Inject script vào head
    const script = document.createElement("script");
    script.innerHTML = `
      !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${APP_CONFIG.FACEBOOK_PIXEL_ID}');
    fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // Add <noscript> fallback (tuỳ chọn)
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${APP_CONFIG.FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1" />`;
    document.head.appendChild(noscript);
  }, []);
};
