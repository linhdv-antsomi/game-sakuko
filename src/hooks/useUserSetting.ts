// Libraries
import { useGetUserInfo, useGetUserSetting } from "queries";

interface UserSettingProps {}

export const useUserSetting = (props?: UserSettingProps) => {
  const {
    data: userSetting,
    isLoading: isSettingLoading,
    isFetching: isSettingFetching,
  } = useGetUserSetting({});

  return {
    isLoading: isSettingLoading || isSettingFetching,
    userSetting,
  };
};
