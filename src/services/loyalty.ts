// Api
import { fetchInstance } from "./api";
// import * as Sentry from "sentry/react";

// Schemas
import {
  AllocateVoucher,
  Countdown,
  CreateLoyaltyCustomer,
  HotNews,
  LoyaltyCustomer,
  Scheme,
  TransactionType,
  UpdateLoyaltyCustomer,
} from "schemas";

// Types
import {
  CommonResponse,
  GetHLListParams,
  SchemeType,
  TransactionResponse,
} from "types";

// Constant
import { APP_CONFIG } from "constant";

const { CLIENT_PREFIX } = APP_CONFIG;
const LOYALTY_ENDPOINT = `${CLIENT_PREFIX}/loyalty`;

export type CreateLoyaltyArgs = {
  data: CreateLoyaltyCustomer;
};

export type UpdateLoyaltyCustomerArgs = {
  id: string;
  data: UpdateLoyaltyCustomer;
};

export type GetLoyaltyCustomerDetailArgs = {
  customerId: string;
};

export type GetTransactionListArgs = {
  id: string;
  type: TransactionType;
  params: GetHLListParams;
};

export type GetSchemeListArgs = {
  params: {
    type: SchemeType;
  };
};

export type GetSchemeDetailArgs = {
  id: string;
};

export type RedeemSchemeArgs = {
  phoneNumber: string;
  schemeId: string;
};

export type GetHotNewsListArgs = {};

export const loyaltyServices = {
  createLoyaltyCustomer: async ({
    data,
  }: CreateLoyaltyArgs): Promise<CommonResponse<LoyaltyCustomer>> => {
    const response = await fetchInstance(`${LOYALTY_ENDPOINT}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    return responseData;
  },
  getLoyaltyCustomerDetail: async ({
    customerId,
  }: GetLoyaltyCustomerDetailArgs): Promise<
    CommonResponse<LoyaltyCustomer>
  > => {
    const response = await fetchInstance(`${LOYALTY_ENDPOINT}/${customerId}`);

    const responseData: CommonResponse<LoyaltyCustomer> = await response.json();

    return responseData;
  },
  updateLoyaltyCustomer: async ({
    id,
    data,
  }: UpdateLoyaltyCustomerArgs): Promise<CommonResponse<LoyaltyCustomer>> => {
    const response = await fetchInstance(`${LOYALTY_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    return responseData;
  },
  getTransactionList: async ({
    id,
    params,
    type,
  }: GetTransactionListArgs): Promise<CommonResponse<TransactionResponse>> => {
    const response = await fetchInstance(
      `${LOYALTY_ENDPOINT}/history/${id}?${new URLSearchParams({
        ...params,
        type,
      } as any).toString()}`,
      {
        method: "GET",
      }
    );

    const data: CommonResponse<TransactionResponse> = await response.json();

    //TODO: Just check for case no data of number  0367741290 , will remove later
    if (id === "0367741290") {
      // Sentry.captureMessage(
      //   "Check No transaction data for customer ID 0367741290",
      //   {
      //     extra: {
      //       id,
      //       params: JSON.stringify(params),
      //       type,
      //       data: JSON.stringify(data),
      //     },
      //   }
      // );
    }

    return data;
  },
  getSchemeList: async ({
    params,
  }: GetSchemeListArgs): Promise<
    CommonResponse<{
      countDown?: Countdown;
      schemes: Scheme[];
    }>
  > => {
    const { type = "all" } = params || {};

    const response = await fetchInstance(
      `${LOYALTY_ENDPOINT}/scheme-list?${new URLSearchParams({
        type,
      }).toString()}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    return data;
  },
  getSchemeDetail: async ({ id }: GetSchemeDetailArgs) => {
    const response = await fetchInstance(`${LOYALTY_ENDPOINT}/scheme/${id}`, {
      method: "GET",
    });

    const data = await response.json();

    return data;
  },
  getFavoriteStoreList: async () => {
    // const response = fetch(favoriteStores)
  },
  getHowNewsList: async (): Promise<CommonResponse<HotNews[]>> => {
    const response = await fetchInstance(`${LOYALTY_ENDPOINT}/hot-news`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  },
  redeemScheme: async ({
    phoneNumber,
    schemeId,
  }: RedeemSchemeArgs): Promise<CommonResponse<AllocateVoucher>> => {
    const response = await fetchInstance(`${LOYALTY_ENDPOINT}/redeem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber,
        schemeId,
      }),
    });

    const data = await response.json();

    return data;
  },
};
