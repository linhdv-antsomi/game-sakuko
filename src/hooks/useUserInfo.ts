// Libraries
import { TIER } from "constant";
import { MD5 } from "crypto-js";
import { isEmpty } from "lodash-es";
import {
  useGetLoyaltyCustomerDetail,
  useGetUserInfo,
  useGetUserSetting,
} from "queries";
import { useMemo } from "react";
import { useDebounceValue } from "usehooks-ts";

// Utils
import { formatVietnamesePhoneNumber } from "utils";

// Hooks
import { useAppConfig } from "./useAppConfig";

// Schemas
import { useRecoilValue } from "recoil";
import { Tier } from "schemas";
import { authenticationState } from "state";

interface UserInfoProps {}

export const useUserInfo = (props?: UserInfoProps) => {
  const {
    data: userInfoData,
    isLoading: isUserInfoLoading,
    isFetching,
  } = useGetUserInfo({});
  const { data: userSetting, isLoading: isUserSettingLoading } =
    useGetUserSetting({});
  const { user } = useRecoilValue(authenticationState);
  const { appSettings } = useAppConfig();

  // Variables
  const phoneNumber = formatVietnamesePhoneNumber(window?.zma?.getPhone() || "");
  const { tierList = Object.values(TIER) } =
    appSettings?.globals?.loyalty || {};

  // Queries
  const {
    data: loyaltyCustomerDetailData,
    isLoading: isLoadingGetLoyaltyCustomerDetail,
    refetch: refetchLoyaltyCustomerDetail,
    isRefetching,
  } = useGetLoyaltyCustomerDetail({
    args: {
      customerId: phoneNumber,
    },
    options: {
      enabled: !!phoneNumber,
    },
  });

  // Memos
  const loyaltyCustomer = useMemo(() => {
    if (loyaltyCustomerDetailData?.code !== 200) {
      return null;
    }

    return loyaltyCustomerDetailData?.data;
  }, [loyaltyCustomerDetailData?.code, loyaltyCustomerDetailData?.data]);

  const isRegistered = useMemo(() => {
    if (
      (((userSetting?.authSetting?.["scope.userInfo"] &&
        userSetting?.authSetting?.["scope.userPhonenumber"]) ||
        !!phoneNumber) &&
        !isEmpty(loyaltyCustomer)) ||
      process.env.NODE_ENV === "development"
    ) {
      return true;
    }

    return false;
  }, [userSetting, phoneNumber, loyaltyCustomer]);

  const [isRegisteredDebounced] = useDebounceValue(isRegistered, 500);
  const isUserLoading =
    isUserInfoLoading ||
    isFetching ||
    isLoadingGetLoyaltyCustomerDetail ||
    isUserSettingLoading;

  const memberTier: Tier = useMemo(() => {
    const tier = tierList?.find(
      (tier) => tier.key === loyaltyCustomer?.membershipLevel
    );

    return isUserLoading
      ? TIER.MEMBER
      : tier ||
          TIER[`${loyaltyCustomer?.membershipLevel}`.toUpperCase()] ||
          TIER.MEMBER;
  }, [isUserLoading, loyaltyCustomer?.membershipLevel, tierList]);

  // Next Member Tier
  const nextMemberTier: Tier | undefined = useMemo(() => {
    const currentTierIndex =
      tierList?.findIndex((tier) => tier.key === memberTier.key) || 0;

    return tierList?.[currentTierIndex + 1] as Tier;
  }, [memberTier.key, tierList]);

  const userInfo = useMemo(() => {
    return {
      ...userInfoData?.userInfo,
      customerId: phoneNumber ? MD5(phoneNumber).toString() : "",
      phoneNumber,
    };
  }, [userInfoData?.userInfo, phoneNumber]);

  return {
    userInfo,
    loyaltyCustomer,
    isRegistered: isRegisteredDebounced,
    userSetting,
    memberTier,
    nextMemberTier,
    isLoading: isUserLoading,
    isLoyaltyCustomerRefetching: isRefetching,
    refetchLoyaltyCustomerDetail,
  };
};
