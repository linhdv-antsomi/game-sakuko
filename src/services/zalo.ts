// Constants
import { APP_CONFIG } from "constant";
import { CommonResponse } from "types";
import { getAccessToken, getPhoneNumber } from "zmp-sdk/apis";

export interface GetZaloInfoParams {
  accessToken: string;
  phoneToken: string;
}

const ZALO_BASE_URL = "https://graph.zalo.me/v2.0/me/info";

export const zaloServices = {
  getZaloInfo: async (): Promise<CommonResponse<{ number: string }>> => {
    // const { accessToken: access_token, phoneToken: code } = params;
    const access_token = await getAccessToken();
    const { token: codeDefault } = await getPhoneNumber({});

    const response = await fetch(ZALO_BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token,
        code: `${codeDefault}`,
        secret_key: APP_CONFIG.SECRET_KEY,
      },
    });

    const data = await response.json();

    return data;
  },
};
