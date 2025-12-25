import { APP_CONFIG } from "constant";
import dayjs from "dayjs";
import { useGetAppSettings } from "queries";
import { useMemo } from "react";

const { CATCH_REWARDS } = APP_CONFIG.GAMES;

// Variables
const searchPrams = new URLSearchParams(window.location.search);
const env = searchPrams.get("env");

export const useAppConfig = () => {
  const { data: appSettingsData, isLoading } = useGetAppSettings();
  const { games, globals } = appSettingsData?.data || {};
  const { affiliate, mixAndMatch, luckyMoney, stampCollector, cardFlip, merryChristmas, catchRewards } = games || {};
  const { systemErrorMessages } = globals || {};

  const gameValidation = useMemo(() => {
    const gameValidation: any = {};

    const getMessage = ({ startDate, endDate, endDateDefaultMessage }) => {
      return dayjs().isBefore(dayjs(startDate))
        ? systemErrorMessages?.gameNotReady ||
            APP_CONFIG.SYSTEM_ERROR_MESSAGES.gameNotReady
        : systemErrorMessages?.gameEnd ||
            endDateDefaultMessage ||
            APP_CONFIG.SYSTEM_ERROR_MESSAGES.gameEnd;
    };
    
    // Catch Rewards
    {
      const gameStartDate =
        catchRewards?.eventStartDate || CATCH_REWARDS.START_DATE;
      const gameEndDate = catchRewards?.eventEndDate || CATCH_REWARDS.END_DATE;

      gameValidation.catchRewards = {
        isValid:
          dayjs().isBefore(dayjs(gameEndDate)) &&
          dayjs().isAfter(dayjs(gameStartDate)),
        startDate: gameStartDate,
        endDate: gameEndDate,
        notAvailableMessage: getMessage({
          startDate: gameStartDate,
          endDate: gameEndDate,
          endDateDefaultMessage: APP_CONFIG.SYSTEM_ERROR_MESSAGES.gameEnd,
        }),
      };
    }

    return gameValidation;
  }, [
    systemErrorMessages?.gameNotReady,
    systemErrorMessages?.gameEnd,
    affiliate?.eventStartDate,
    affiliate?.eventEndDate,
    mixAndMatch?.eventStartDate,
    mixAndMatch?.eventEndDate,
    stampCollector?.eventStartDate,
    stampCollector?.eventEndDate,
    cardFlip?.eventStartDate,
    cardFlip?.eventEndDate,
    catchRewards?.eventStartDate,
    catchRewards?.eventEndDate,
  ]);

  return {
    code: appSettingsData?.code,
    appSettings: appSettingsData?.data,
    isLoading,
    gameValidation,
    isCardFlipValid: gameValidation?.cardFlip?.isValid,
    isMerryChristmasValid: gameValidation?.merryChristmas?.isValid,
  };
};
