import { APP_CONFIG } from "constant";
import dayjs from "dayjs";
import { useGetAppSettings } from "queries";
import { useMemo } from "react";

const { AFFILIATE, MIX_AND_MATCH, STAMP_COLLECTOR, CARD_FLIP, MERRY_CHRISTMAS, CATCH_REWARDS } = APP_CONFIG.GAMES;

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

    {
      const affiliateStartDate =
        affiliate?.eventStartDate || AFFILIATE.START_DATE;
      const affiliateEndDate = affiliate?.eventEndDate || AFFILIATE.END_DATE;

      gameValidation.affiliate = {
        isValid:
          dayjs().isBefore(dayjs(affiliateEndDate)) &&
          dayjs().isAfter(dayjs(affiliateStartDate)),
        endDate: affiliateEndDate,
        startDate: affiliateStartDate,
        notAvailableMessage: getMessage({
          startDate: affiliateStartDate,
          endDate: affiliateEndDate,
          endDateDefaultMessage: APP_CONFIG.SYSTEM_ERROR_MESSAGES.gameEnd,
        }),
      };
    }

    {
      const mixAndMatchStartDate =
        mixAndMatch?.eventStartDate || MIX_AND_MATCH.START_DATE;
      const mixAndMatchEndDate =
        mixAndMatch?.eventEndDate || MIX_AND_MATCH.END_DATE;

      gameValidation.mixAndMatch = {
        isValid:
          `${env}`.toLowerCase() === "testing" // Only validate in testing environment
            ? true
            : dayjs().isBefore(dayjs(mixAndMatchEndDate)) &&
              dayjs().isAfter(dayjs(mixAndMatchStartDate)),
        endDate: mixAndMatchEndDate,
        startDate: mixAndMatchStartDate,
        notAvailableMessage: getMessage({
          startDate: mixAndMatchStartDate,
          endDate: mixAndMatchEndDate,
          endDateDefaultMessage: APP_CONFIG.GAMES.MIX_AND_MATCH.GAME_END_MSG,
        }),
      };
    }

    {
      const stampCollectorStartDate =
        stampCollector?.eventStartDate || STAMP_COLLECTOR.START_DATE;
      const stampCollectorEndDate =
        stampCollector?.eventEndDate || STAMP_COLLECTOR.END_DATE;

      gameValidation.stampCollector = {
        isValid:
          dayjs().isBefore(dayjs(stampCollectorEndDate)) &&
          dayjs().isAfter(dayjs(stampCollectorStartDate)),
        startDate: stampCollectorStartDate,
        endDate: stampCollectorEndDate,
      };
    }

    // Card Flip
    {
      const gameStartDate =
        cardFlip?.eventStartDate || CARD_FLIP.START_DATE;
      const gameEndDate = cardFlip?.eventEndDate || CARD_FLIP.END_DATE;

      gameValidation.cardFlip = {
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

    // Merry Christmas
    {
      const gameStartDate =
        merryChristmas?.eventStartDate || MERRY_CHRISTMAS.START_DATE;
      const gameEndDate = merryChristmas?.eventEndDate || MERRY_CHRISTMAS.END_DATE;

      gameValidation.merryChristmas = {
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
    isCatchRewardsValid: gameValidation?.catchRewards?.isValid,
  };
};
