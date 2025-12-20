// import * as Sentry from "@sentry/react";
import { APP_CONFIG } from "constant";
import { jwtDecode } from "jwt-decode";
import { isDevelopment, isWeb } from "utils";

const { API_ZMA_URL, SANDBOX_API_ZMA_URL } = APP_CONFIG;

const searchPrams = new URLSearchParams(window.location.search);
const env = searchPrams.get("env");
const BASE_URL = window?.zma?.getApiDomain() || SANDBOX_API_ZMA_URL;
// const BASE_URL = `${
//   ["testing", "development"].includes(`${env}`.toLowerCase()) ? SANDBOX_API_ZMA_URL : API_ZMA_URL
// }`;

export const fetchInstance = async (
  input: RequestInfo | URL,
  init?: RequestInit & { skipAuth?: boolean }
) => {
  try {
    const { skipAuth = false, ...restOfInit } = init || {};
    const accessToken = skipAuth ? null : window.zma.getAccessToken();
    const decodedToken = accessToken ? jwtDecode(accessToken) : null;

    const response = await fetch(`${BASE_URL}${input}`, {
      ...restOfInit,
      headers: {
        ...(!skipAuth && {
          Authorization: `Bearer ${accessToken || APP_CONFIG.DEV_ACCESS_TOKEN || 'af71bb32-96b7-4dec-86ef-5a969e494ecb'}`
        }),
        ...restOfInit?.headers,
      },
    });

    // If token expired, reload app to trigger login
    if (decodedToken) {
      const currentTime = Math.floor(Date.now() / 1000);
      if ((decodedToken.exp || 0) < currentTime) {
        window.location.reload();
      }
    }

    switch (response?.status) {
      case 401:
      case 403: {
        // Sentry.captureException(response);

        const data = await response.json();

        throw new Error(data?.message);
      }
      case 301: {
        const data = await response.json();

        throw new Error(
          data?.message || APP_CONFIG.SYSTEM_ERROR_MESSAGES.networkError
        );
      }

      default:
        break;
    }

    return response;
  } catch (error) {
    // Sentry.captureException({
    //   input,
    //   init,
    //   error,
    // });

    throw error;
  }
};
