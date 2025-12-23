// Libraries
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { GetSettingReturn, GetUserInfoReturns } from "zmp-sdk";
import { getSetting, getUserInfo } from "zmp-sdk/apis";

// Constants
import { QUERY_KEY } from "constant";

// Schemas
import {
  CDPCustomer,
  CheckCanAllocateVoucher,
  CheckUserResponse,
} from "schemas";

// Services
import {
  CheckUserCanAllocateArgs,
  GetCDPCustomerParams,
  userServices,
  zaloServices,
} from "services";

// Types
import { CommonResponse } from "types";

export interface UseCheckUserProps {
  options?: UseMutationOptions<CommonResponse<CheckUserResponse>, Error>;
}

export interface UseGetUserInfoProps {
  options?: UseQueryOptions<GetUserInfoReturns, Error>;
}
export interface UseGetUserSettingProps {
  options?: UseQueryOptions<GetSettingReturn, Error>;
}
export interface UseGetZaloInfoProps {
  options?: Partial<UseQueryOptions<CommonResponse<{ number: string }>, Error>>;
}

export interface UseCheckCanAllocateProps {
  args?: CheckUserCanAllocateArgs;
  options?: UseQueryOptions<CommonResponse<CheckCanAllocateVoucher>, Error>;
}

export interface UseGetCDPCustomerProps {
  params: GetCDPCustomerParams;
  options?: Partial<UseQueryOptions<CommonResponse<CDPCustomer>, Error>>;
}

export const useCheckUser = ({ options }: UseCheckUserProps) => {
  return useMutation({
    mutationFn: userServices.checkUser,
    ...options,
  });
};

export const useCheckNewUser = () => {
  return useQuery({
    queryKey: [QUERY_KEY.CHECK_NEW_USER],
    queryFn: () => userServices.checkUser(),
  });
};

export const useCheckUserCanAllocate = ({
  args,
  options,
}: UseCheckCanAllocateProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.CHECK_USER_CAN_ALLOCATE, args],
    queryFn: () => userServices.checkUserCanAllocate(args),
    ...options,
  });
};
export const useCheckUserCanAllocateV2 = ({
  args,
  options,
}: UseCheckCanAllocateProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.CHECK_USER_CAN_ALLOCATE, args],
    queryFn: () => userServices.checkUserCanAllocate(args),
    ...options,
  });
};

export const useGetUserInfo = ({ options }: UseGetUserInfoProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_USER_INFO],
    queryFn: () =>
      typeof window?.zma?.getUserInfoZalo === "function"
        ? window?.zma?.getUserInfoZalo()
        : getUserInfo(),
    ...options,
  });
};

export const useGetUserSetting = ({ options }: UseGetUserSettingProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_USER_SETTING],
    queryFn: () =>
      typeof window?.zma?.getSettingZalo === "function"
        ? window?.zma?.getSettingZalo()
        : getSetting(),
    ...options,
  });
};

export const useGetZaloInfo = ({ options }: UseGetZaloInfoProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_ZALO_USER_INFO],
    queryFn: () => zaloServices.getZaloInfo(),
    ...options,
  });
};

export const useGetCDPCustomer = ({
  params,
  options,
}: UseGetCDPCustomerProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_CDP_CUSTOMER, params],
    queryFn: () => userServices.getCDPCustomer(params),
    ...options,
  });
};
