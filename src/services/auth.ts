import { APP_CONFIG } from "constant";
import { AuthenticationApi } from "schemas";
import { getAccessToken, getPhoneNumber, getSetting } from "zmp-sdk";
import { fetchInstance } from "./api";

// const AUTH_ENDPOINT = "/auth/zma/login";
const AUTH_ENDPOINT = `${APP_CONFIG.CLIENT_PREFIX}/loyalty/login`;

export const authServices = {
  /**
   * Logs in to the application using Zalo's access token and phone token.
   * @returns {Promise<AuthLoginResponse>} A promise that resolves to an object containing
   * an access token and a user object with the user's Zalo UID and phone number.
   */
  login: async (): Promise<AuthenticationApi> => {
    const accessToken = await getAccessToken();
    const { authSetting } = await getSetting();
    let phoneToken: string | undefined;

    if (authSetting["scope.userPhonenumber"]) {
      const { token } = await getPhoneNumber();
      phoneToken = token;
    }

    const response = await fetchInstance(AUTH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        portalId: APP_CONFIG.PORTAL_ID,
        accessToken,
        phoneToken,
      }),
      skipAuth: true,
    });

    const data = await response.json();

    return data;
  },
};
