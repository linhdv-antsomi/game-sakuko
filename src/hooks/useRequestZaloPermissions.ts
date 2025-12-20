import { useCallback, useEffect } from "react";
import { useImmer } from "use-immer";
import { followOA, getPhoneNumber, getUserInfo } from "zmp-sdk/apis";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";

import { callCdpEvent, handleError } from "utils";
import {
  APP_CONFIG,
  EVENT_CONFIG,
  LOCAL_STORAGE_KEY,
  QUERY_KEY,
} from "constant";
import { useUserInfo } from "./useUserInfo";
import { useAuthentication } from "./useAuthentication";

const MAX_ALLOW_INFO_ATTEMPTS = 5;

interface UseRequestZaloPermissionsProps {
  onFail?: (params: {
    step: "allowInfo" | "flowOA" | "allowPhone";
    message?: string;
    error?: any;
  }) => void;
  onFinish?: (params: { userInfo: any }) => void;
  cdpEventConfig?: {
    allowCallIdentify?: boolean;
    allowCallJoinGame?: boolean;
    pageCate: string;
  };
}

/**
 * Custom hook to manage the flow of requesting Zalo permissions:
 * - Requesting user info (auto-permission)
 * - Checking OA follow status and following if needed
 * - Requesting phone number permission
 * - Emitting CDP events during each step
 *
 * @param {UseRequestZaloPermissionsProps} props - Configuration for permission request flow
 * @returns {{ requestZaloPermissions: () => Promise<void> }} - Main function to trigger permission requests
 */
export const useRequestZaloPermissions = (
  props: UseRequestZaloPermissionsProps
) => {
  const { cdpEventConfig, onFail, onFinish } = props;

  // Hooks & State
  const queryClient = useQueryClient();
  const [config, setConfig] = useLocalStorage(LOCAL_STORAGE_KEY.CONFIG, {
    isAcceptRule: false,
    isPhoneNumberAllowed: false,
    lastIdentifyDate: "",
  });

  const { userInfo } = useUserInfo();
  const { handleLogin } = useAuthentication();

  const [state, setState] = useImmer({
    numberOfAllowInfoRequest: 0,
  });

  const { isPhoneNumberAllowed } = config;
  const { pageCate = EVENT_CONFIG.APP_LOYALTY, allowCallIdentify = true } =
    cdpEventConfig || {};

  // Limit excessive requests to getUserInfo
  useEffect(() => {
    if (state.numberOfAllowInfoRequest >= MAX_ALLOW_INFO_ATTEMPTS) {
      onFail?.({
        step: "allowInfo",
        message: APP_CONFIG.SYSTEM_ERROR_MESSAGES.limitRequest,
        error: { code: -203 },
      });
    }
  }, [state.numberOfAllowInfoRequest, onFail]);

  /**
   * Request permission to access user's phone number.
   * Also emits `allow_phone` CDP event and updates local config.
   */
  const handleRequestPhonePermission = useCallback(async () => {
    getPhoneNumber({
      async success() {
        if (!isPhoneNumberAllowed) {
          callCdpEvent({
            uId: userInfo?.id,
            data: {
              page_type: "allow_phone",
              page_cate: pageCate,
            },
          });

          // Save phone permission to local storage
          setConfig((prev) => ({
            ...prev,
            isPhoneNumberAllowed: true,
          }));
        }

        // Invalidate related user queries to refetch updated data
        setTimeout(() => {
          handleLogin();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.GET_USER_INFO],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.GET_USER_SETTING],
          });
        }, 1000);

        onFinish?.({ userInfo });
      },
      fail(error) {
        handleError(error, {
          component: useRequestZaloPermissions.name,
          action: "handleRequestPhonePermission",
        });

        onFail?.({
          step: "allowPhone",
          message: error.message,
          error,
        });
      },
    });
  }, [
    isPhoneNumberAllowed,
    userInfo,
    onFinish,
    pageCate,
    setConfig,
    handleLogin,
    queryClient,
    onFail,
  ]);

  /**
   * Main permission request flow:
   * 1. Request user info
   * 2. Emit join_game event if first time
   * 3. Follow OA if not followed
   * 4. Request phone number
   */
  const requestZaloPermissions = useCallback(async () => {
    onFinish?.({ userInfo: {} });
    const { userInfo: requestedUserInfo } = await getUserInfo({
      autoRequestPermission: true,
      fail(error) {
        setState((draft) => {
          draft.numberOfAllowInfoRequest += 1;
        });

        handleError(error, {
          component: useRequestZaloPermissions.name,
          action: "getUserInfo",
        });

        onFail?.({
          step: "allowInfo",
          message: error.message,
          error,
        });
      },
    });

    if (!requestedUserInfo) return;

    // Emit join_game event for new users (who haven't filled in name)
    if (!userInfo.name && allowCallIdentify) {
      callCdpEvent({
        uId: userInfo.id,
        data: {
          page_type: "join_game",
          page_cate: pageCate,
        },
      });
    }

    // If OA not followed, request to follow then continue flow
    if (!requestedUserInfo.followedOA) {
      await followOA({
        id: APP_CONFIG.OA_ID,
        async success() {
          // Call CDP event for following OA
          callCdpEvent({
            uId: requestedUserInfo.id,
            data: {
              page_type: "follow_oa",
              page_cate: pageCate,
            },
          });

          await handleRequestPhonePermission();
        },
        fail(error) {
          handleError(error, {
            component: useRequestZaloPermissions.name,
            action: "flowOA",
          });

          onFail?.({
            step: "flowOA",
            message: error.message,
            error,
          });
        },
      });
    } else {
      await handleRequestPhonePermission();
    }
  }, [
    allowCallIdentify,
    userInfo.name,
    userInfo.id,
    pageCate,
    setState,
    handleRequestPhonePermission,
    onFail,
  ]);

  return {
    requestZaloPermissions,
  };
};
