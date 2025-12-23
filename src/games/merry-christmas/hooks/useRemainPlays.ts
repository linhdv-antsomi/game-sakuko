// Libraries
import { useMemo } from "react";

// Queries
import { useCheckCanAllocateVoucherChristmas } from "queries";

interface UseRemainPlaysProps {
  maxPlayTimes?: number;
}

export const useRemainPlays = (props?: UseRemainPlaysProps) => {
  // const { maxPlayTimes = APP_CONFIG.GAMES.CHOOSE_RIGHT_PRIZE.MAX_PLAY_TIMES } =
  //   props || {};

  // Queries
  const { data: canAllocateData, isLoading } = useCheckCanAllocateVoucherChristmas({
    // options: {
    //   refetchOnMount: 'always'
    // }
  });

  const remainPlays = useMemo(() => {
    // return 10;
    if (
      canAllocateData?.data?.remainPlays &&
      !isNaN(canAllocateData?.data?.remainPlays)
    ) {
      return +canAllocateData?.data?.remainPlays;
    }

    return 0;
  }, [canAllocateData?.data?.remainPlays]);

  return {
    remainPlays,
    isCanPlay: remainPlays > 0,
    isLoading,
  };
};
