import {
  AllocateVoucher,
  CheckCanAllocateVoucherChristmas,
  CheckCanShareGame,
  LeaderBoardItem,
} from "schemas";
import { CommonResponse } from "types";
import { getSearchParamsAsObject } from "utils";
import { fetchInstance } from "./api";
import { APP_CONFIG } from "constant";

const { CLIENT_PREFIX } = APP_CONFIG;
const GAME_ENDPOINT = `${CLIENT_PREFIX}/christmas`;

export interface AllocateVoucherMerryChristmasArgs {
  bodyData: {
    phoneNumber: string;
    customerId: string;
    userName: string;
    extra?: Record<string, any>;
  };
}

export type AllocateVoucherMerryChristmasResponse =
  CommonResponse<AllocateVoucher>;

export type ShareChristmasResponse = CommonResponse<{}>;

export type GetLeaderBoardChristmasArgs = {
};

export type GetLeaderboardChristmasResponse = CommonResponse<LeaderBoardItem[]>

export const merryChristmasServices = {
  allocateVoucher: async (
    args: AllocateVoucherMerryChristmasArgs
  ): Promise<AllocateVoucherMerryChristmasResponse> => {
    // Get utm params
    const searchParams = getSearchParamsAsObject();
    const utmObjects = {};

    Object.keys(searchParams).forEach((key) => {
      if (key.startsWith("utm_")) {
        utmObjects[key] = searchParams[key];
      }
    });

    const response = await fetchInstance(`${GAME_ENDPOINT}/allocate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...(args?.bodyData || {}),
        extra: {
          ...utmObjects,
          ...(args?.bodyData?.extra || {}), // Merge with any additional extra data
        },
      }),
    });

    const data = await response.json();

    return data;
  },

  checkCanAllocateVoucher: async (args: {}): Promise<
    CommonResponse<CheckCanAllocateVoucherChristmas>
  > => {
    const response = await fetchInstance(`${GAME_ENDPOINT}/can-allocate`);
    const data = await response.json();

    return data;
  },

  shareGame: async (args: {}): Promise<ShareChristmasResponse> => {
    const response = await fetchInstance(`${GAME_ENDPOINT}/share-game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return data as ShareChristmasResponse;
  },

  checkCanShareGame: async (): Promise<CommonResponse<CheckCanShareGame>> => {
    const response = await fetchInstance(`${GAME_ENDPOINT}/can-share-game`);

    const data = await response.json();

    return data as CommonResponse<CheckCanShareGame>;
  },
  getLeaderBoard: async (
    args?: GetLeaderBoardChristmasArgs
  ): Promise<GetLeaderboardChristmasResponse> => {
    const response = await fetchInstance(
      `${GAME_ENDPOINT}/leaderboard`
    );

    const data = await response.json();

    return data as GetLeaderboardChristmasResponse;
  },
};
