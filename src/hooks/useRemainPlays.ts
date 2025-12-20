// Libraries
import { useMemo } from "react";
import { isNull } from "lodash-es";

// Queries
import {
  useCheckCanAllocateVoucherAFF,
  useCheckUserCanAllocate,
  useCheckUserCanAllocateV2,
} from "queries";

// Constants
import { APP_CONFIG } from "constant";

interface UseRemainPlaysProps {
  maxPlayTimes?: number;
  apiConfig?: {
    endPoint?: string;
  };
}

/**
 * A custom hook that calculates the remaining number of plays a user has
 * based on the maximum allowed play times and the redemption count retrieved
 * from an external query.
 *
 * @param props - Optional properties to configure the hook.
 * @param props.maxPlayTimes - The maximum number of play times allowed. Defaults to the value
 * from the application configuration (`APP_CONFIG.GAMES.MAX_PLAY_TIMES`).
 *
 * @returns An object containing:
 * - `remainPlays`: The number of remaining plays available to the user.
 * - `isCanPlay`: A boolean indicating whether the user can still play (true if `remainPlays > 0`).
 * - `isLoading`: A boolean indicating whether the data required to calculate the remaining plays
 *   is still being loaded.
 *
 * @remarks
 * This hook uses the `useCheckCanAllocateVoucherV2` query to fetch the redemption count,
 * which is then used to calculate the remaining plays. If the redemption count is null or
 * invalid, the remaining plays will default to 0.
 *
 * @example
 * ```typescript
 * const { remainPlays, isCanPlay, isLoading } = useRemainPlays({ maxPlayTimes: 5 });
 *
 * if (isLoading) {
 *   console.log('Loading...');
 * } else if (isCanPlay) {
 *   console.log(`You have ${remainPlays} plays remaining.`);
 * } else {
 *   console.log('No plays remaining.');
 * }
 * ```
 */
export const useRemainPlays = (props?: UseRemainPlaysProps) => {
  const {
    maxPlayTimes = APP_CONFIG.GAMES.AFFILIATE.MAX_PLAY_TIMES,
    apiConfig,
  } = props || {};
  const { endPoint } = apiConfig || {};

  // Queries
  const { data: canAllocateData, isLoading } = useCheckUserCanAllocate({
    args: {
      endPoint,
    },
  });

  const remainPlays = useMemo(() => {
    if (canAllocateData?.data?.remainPlays) {
      return canAllocateData?.data?.remainPlays;
    }

    if (
      !isNull(canAllocateData?.data?.redemptionCount) &&
      !isNaN(canAllocateData?.data?.redemptionCount)
    ) {
      return maxPlayTimes - canAllocateData?.data?.redemptionCount;
    }

    return 0;
  }, [
    canAllocateData?.data?.redemptionCount,
    canAllocateData?.data?.remainPlays,
    maxPlayTimes,
  ]);

  return {
    remainPlays,
    isCanPlay: remainPlays > 0,
    isLoading,
  };
};
