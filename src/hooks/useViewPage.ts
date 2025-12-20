import { EVENT_CONFIG } from "constant";
import { useUserInfo } from "./useUserInfo";
import { useEffect } from "react";
import { callCdpEvent } from "utils";
import { useDebounceCallback } from "usehooks-ts";
import useEffectAfterDepsUpdate from "./useEffectAfterDepsUpdate";
import { useDeepCompareEffect } from "./useDeepCompareEffect";

interface UseViewPageProps {
  pageType?: string;
  pageCate?: string;
}

export const useViewPage = (props: UseViewPageProps) => {
  const { pageCate = EVENT_CONFIG.APP_LOYALTY, pageType = "home" } = props;
  const { userInfo } = useUserInfo();

  useDeepCompareEffect(() => {
    // Set timeout for waiting script loaded
    setTimeout(() => {
      if (userInfo?.id && pageCate && pageType) {
        callCdpEvent({
          uId: userInfo.id,
          data: {
            page_type: pageType,
            page_cate: pageCate,
          },
        });
      }
    }, 500);
  }, [pageCate, pageType, userInfo?.id]);
};
