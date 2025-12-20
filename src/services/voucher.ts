// Constants
import { APP_CONFIG } from "constant";

// Api
import { fetchInstance } from "./api";

// Types
import { CommonResponse, GetListParams, GetListResponse } from "types";

// Schemas
import {
  AllocateVoucher,
  AppSettings,
  CheckCanAllocateVoucher,
  Voucher,
} from "schemas";
import { getSearchParamsAsObject } from "utils";

const { CLIENT_PREFIX } = APP_CONFIG;
const VOUCHER_ENDPOINT = `${CLIENT_PREFIX}/voucher`;

export type AllocateVoucherParams = {
  appUserId?: string;
  phoneNumber?: string | number;
};

export type AllocateVoucherAFFParams = {
  phoneNumber: string;
  name: string;
  idByOa: string;
  scheme_code: string;
  extra?: Record<string, any>;
};

export type GetVoucherDetailParams = {
  id: string;
};

export type CheckCanAllocateVoucherParams = {
  appUserId?: string;
};

export const voucherServices = {
  getListVoucher: async (
    params: GetListParams
  ): Promise<GetListResponse<Voucher>> => {
    const response = await fetchInstance(`${VOUCHER_ENDPOINT}/performance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...params,
      }),
    });
    const data = await response.json();

    // return {
    //   code: 200,
    //   data: {
    //     entries: [],
    //     total: 0,
    //   },
    //   message: "h",
    // };
    return data;
  },
  allocateVoucher: async (
    params: AllocateVoucherParams
  ): Promise<CommonResponse<AllocateVoucher>> => {
    const response = await fetchInstance(`${VOUCHER_ENDPOINT}/allocate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const data = await response.json();

    return data;
  },
  allocateVoucherAFF: async (
    params: AllocateVoucherAFFParams
  ): Promise<CommonResponse<AllocateVoucher>> => {
    // Get utm params
    const searchParams = getSearchParamsAsObject();
    const utmObjects = {};

    Object.keys(searchParams).forEach((key) => {
      if (key.startsWith("utm_")) {
        utmObjects[key] = searchParams[key];
      }
    });

    const response = await fetchInstance(`${VOUCHER_ENDPOINT}/allocate-aff`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...params,
        extra: {
          ...utmObjects,
          ...params.extra,
        },
      }),
    });
    const data = await response.json();

    return data;
  },
  getVoucherDetail: async (
    params: GetVoucherDetailParams
  ): Promise<CommonResponse<Voucher>> => {
    const { id } = params;

    const response = await fetchInstance(`${VOUCHER_ENDPOINT}/${id}`);
    const data = await response.json();

    return data;
  },
  checkCanAllocateVoucher: async ({
    appUserId,
  }: CheckCanAllocateVoucherParams = {}): Promise<
    CommonResponse<CheckCanAllocateVoucher>
  > => {
    const response = await fetchInstance(`${VOUCHER_ENDPOINT}/can-allocate`);
    const data = await response.json();

    return data;
  },
  updateVoucher: async (
    voucher: Partial<Voucher>
  ): Promise<CommonResponse<number>> => {
    const response = await fetchInstance(`${VOUCHER_ENDPOINT}/${voucher.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(voucher),
    });

    const data = await response.json();

    return data;
  },
  getAppSettings: async (): Promise<CommonResponse<AppSettings>> => {
    const response = await fetchInstance(`${VOUCHER_ENDPOINT}/app-settings`, {
      skipAuth: true,
    });
    const data: CommonResponse<AppSettings> = await response.json();

    return data;
  },
};
