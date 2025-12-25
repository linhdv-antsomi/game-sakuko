// Libraries
import React, { useCallback, useEffect, useMemo } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { AnimatePresence, motion, Transition } from "motion/react";
import { useImmer } from "use-immer";
import { EventName, events, openShareSheet } from "zmp-sdk/apis";
import { useNavigate } from "react-router-dom";

// States
import { MerryChristmasScreen, merryChristmasState } from "./state";

// Constants
import { SCREEN_KEYS } from "./constants";
import { APP_CONFIG, EVENT_CONFIG, PAGE_TYPE } from "constant";

// Components
import {
  Instructions,
  LeaderBoard,
  MainMenu,
  PlayGame,
  ResultFail,
  Results,
} from "./screens";
import { SystemNotificationModal, VolumeAudioControl } from "components";
import { Toast } from "@antscorp/ama-ui";

// Hooks
import {
  useAppConfig,
  // useNavigateWithSearch,
  useUserInfo,
} from "hooks";
import {
  useCheckin,
  useGetCanShare,
  useGetGameDetail,
  usePlayGame,
  useShareGame,
} from "queries";

// Types
import { Scores } from "./screens/PlayGame/types";

// import * as Sentry from "sentry/react";

// Utils
import { audioManager, callCdpEvent } from "utils";
import { bgChristmasMusic } from "./utils";

interface MerryChristmasProps {}

export const MerryChristmasWrapper = styled.div`
  --color-background-game: #ffd1e8;
  --header-padding-top: calc(var(--zaui-safe-area-inset-top, 24px));

  width: 100%;
  height: 100%;
  background-color: var(--color-background-game);
  /* padding-top: var(--header-padding-top); */
  font-family: "Montserrat", sans-serif;
  overflow: hidden;

  .screen-container {
  }
`;

/**
 * Screen transition variants for Framer Motion
 */
const screenVariants = {
  initial: { opacity: 0, scale: 1 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.05 },
};

const screenTransition: Transition = {
  duration: 0.3,
  ease: "easeInOut",
};

export const MerryChristmas: React.FC<MerryChristmasProps> = (props) => {
  const navigateReact = useNavigate();
  const navigate = window?.zma?.navigate || navigateReact;
  const [christmasState, setMerryChristmasState] =
    useRecoilState(merryChristmasState);
  const resetMerryChristmasState = useResetRecoilState(merryChristmasState);
  const { userInfo } = useUserInfo();
  const { appSettings } = useAppConfig();
  const { data: gameDetail } = useGetGameDetail();
  const { data: canShareGameData } = useGetCanShare();
  const { mutateAsync: checkin } = useCheckin();
  const { mutateAsync: shareGame } = useShareGame({
    options: {
      onSuccess({ code, errorCode }) {
        // If the code is not 200, it means that the voucher is out of stock
        if (code !== 200) {
          Toast.show({
            icon: "success",
            content: <div className="text-center">+1 lượt chơi</div>,
            duration: 1000,
          });
        }
      },
      onError() {},
    },
  });

  // State
  const [state, setState] = useImmer({
    isOutOfVoucher: false,
  });

  // Variables
  const {
    shareTitle,
    shareDescription,
    shareThumbnail,
    sharePath,
    minScoreToClaimReward,
  } = gameDetail?.data?.metadata || {};
  const { systemErrorMessages } = appSettings?.globals || {};
  const { currentScreen, isAllocatingCode, totalScore } = christmasState;
  const { isOutOfVoucher } = state;

  const { mutateAsync: allocateVoucher } = usePlayGame({
    options: {
      onSuccess({
        code,
        data: {
          reward: {
            metadata: { promotion_code },
          },
        },
      }) {
        // If the code is not 200, it means that the voucher is out of stock
        // If the totalScore is greater than or equal to minScoreToClaimReward, it means that the voucher is out of stock
        if (
          code !== 200 ||
          (totalScore &&
            totalScore >= minScoreToClaimReward &&
            code === 200 &&
            !promotion_code)
        ) {
          setTimeout(() => {
            setState((draft) => {
              draft.isOutOfVoucher = true;
            });
          }, 1000);
        }
      },
      onError() {
        setState((draft) => {
          draft.isOutOfVoucher = true;
        });
      },
    },
  });

  const handleAllocateVoucher = useCallback(
    async (scores: Scores, totalScore: number) => {
      if (isAllocatingCode || !userInfo) return;

      setMerryChristmasState((prev) => ({
        ...prev,
        isAllocatingCode: true,
      }));

      try {
        const { data } =
          (await allocateVoucher({
            bodyData: {
              phoneNumber: userInfo.phoneNumber,
              customerId: userInfo.customerId,
              userName: userInfo.name || "",
              extra: {
                point: totalScore,
                collectedItems: scores,
              },
            },
          })) || {};

        // Sentry capture
        // Sentry.captureMessage(
        //   "[Catch Rewards][Allocate Voucher] Allocate voucher request",
        //   {
        //     level: "info",
        //     extra: {
        //       customerId: userInfo?.customerId,
        //       data,
        //     },
        //   }
        // );

        if (data?.reward) {
          const { globalTracking, promotion_code } =
            data?.reward?.metadata || {};

          // Call Global Tracking Event
          fetch(globalTracking?.impression);
          fetch(globalTracking?.view);

          // Call CDP Event
          callCdpEvent({
            data: {
              page_type: PAGE_TYPE.GIFT_CODE,
              page_cate: EVENT_CONFIG.CATCH_REWARDS,
            },
            dims: {
              promotion_code: {
                id: promotion_code,
              },
            },
            uId: userInfo.id,
          });

          setMerryChristmasState((prev) => ({
            ...prev,
            allocateVoucher: data,
            isAllocatingCode: false,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [isAllocatingCode, userInfo, setMerryChristmasState, allocateVoucher]
  );

  const handleShare = async ({
    pageType = PAGE_TYPE.HOME,
    pageCate = EVENT_CONFIG.CATCH_REWARDS,
  }: {
    pageType?: string;
    pageCate?: string;
  }) => {
    const openShareZalo =
      typeof window?.zma?.openShareSheet === "function"
        ? window?.zma?.openShareSheet
        : openShareSheet;

    const { numberOfUser, shareType, status } =
      (await openShareZalo({
        type: "zmp_deep_link",
        data: {
          title: shareTitle || APP_CONFIG.GAMES.CATCH_REWARDS.SHARE_TITLE,
          description:
            shareDescription ||
            APP_CONFIG.GAMES.CATCH_REWARDS.SHARE_DESCRIPTION,
          thumbnail:
            shareThumbnail || APP_CONFIG.GAMES.CATCH_REWARDS.SHARE_THUMBNAIL,
          path: sharePath || APP_CONFIG.GAMES.CATCH_REWARDS.SHARE_PATH,
        },
      })) || {};

    if (status) {
      callCdpEvent({
        ea: "share",
        ec: "program",
        uId: userInfo?.id,
        data: {
          quantity_user: +numberOfUser || 1,
          share_type: shareType || (+numberOfUser > 1 ? "2" : "0"),
          share_status: +status,
          page_type: pageType,
          page_cate: pageCate,
        },
      });

      if (canShareGameData?.data?.canShare) {
        await shareGame({});
      }
    }
  };

  const onClickRedirectVoucherList = () => {
    if (typeof window?.zma?.navigateVoucherList === "function") {
      window.zma.navigateVoucherList();
    } else {
      navigate("/gift", {
        newParams: {
          tab: "redeemed",
          voucherType: "voucher",
        },
      });
    }
  };

  const handleGameOver = (scores: Scores, totalScore: number) => {
    handleAllocateVoucher(scores, totalScore);
  };

  /**
   * Screen configuration with component mapping
   * Add new screens here to register them
   */
  const SCREENS: Record<MerryChristmasScreen, React.ComponentType> = {
    [SCREEN_KEYS.MAIN_MENU]: () => <MainMenu onShare={handleShare} />,
    [SCREEN_KEYS.INSTRUCTIONS]: () => <Instructions />,
    [SCREEN_KEYS.PLAY_GAME]: () => <PlayGame onGameOver={handleGameOver} />,
    [SCREEN_KEYS.RESULTS]: () => <Results onShare={handleShare} />,
    [SCREEN_KEYS.RESULT_FAILED]: () => <ResultFail onShare={handleShare} />,
    [SCREEN_KEYS.LEADER_BOARD]: () => <LeaderBoard onShare={handleShare} />,
  } as const;

  // Get the current screen component
  const CurrentScreenComponent = useMemo(() => {
    return SCREENS[currentScreen] || SCREENS["main-menu"];
  }, [currentScreen]);

  // CHECKIN
  useEffect(() => {
    checkin();
  }, []);

  useEffect(() => {
    return () => {
      resetMerryChristmasState();
    };
  }, [resetMerryChristmasState]);

  // Background music
  // useEffect(() => {
  //   const gestureEvents = ["pointerdown", "touchstart", "click"];

  //   const initAudio = () => {
  //     bgChristmasMusic.init();
  //     bgChristmasMusic.play();
  //     gestureEvents.forEach((e) => document.removeEventListener(e, initAudio));
  //   };

  //   // Dùng cho cả iOS & Android
  //   gestureEvents.forEach((e) =>
  //     document.addEventListener(e, initAudio, { once: true })
  //   );

  //   return () => {
  //     gestureEvents.forEach((e) => document.removeEventListener(e, initAudio));
  //     bgChristmasMusic.stop();
  //   };
  // }, []);

  // useEffect(() => {
  //   const onPause = () => {
  //     if (audioManager.mutedByApp) return;
  //     audioManager.muteAllByApp();
  //   };

  //   const onResume = () => {
  //     if (!audioManager.mutedByApp) return;
  //     audioManager.unmuteAllByApp();
  //   };

  //   events.on(EventName.AppPaused, onPause);
  //   events.on(EventName.AppResumed, onResume);

  //   return () => {
  //     events.off(EventName.AppPaused, onPause);
  //     events.off(EventName.AppResumed, onResume);
  //   };
  // }, []);

  return (
    <MerryChristmasWrapper>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={screenTransition}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <CurrentScreenComponent />
        </motion.div>
      </AnimatePresence>

      {/* <VolumeAudioControl /> */}

      <SystemNotificationModal
        showCloseButton={false}
        visible={isOutOfVoucher}
        title="Thông báo"
        description={
          <span
            dangerouslySetInnerHTML={{
              __html: `${
                systemErrorMessages?.outOfCode ||
                APP_CONFIG.SYSTEM_ERROR_MESSAGES.outOfCode ||
                ""
              }`,
            }}
          />
        }
        retryButtonProps={{
          onClick: onClickRedirectVoucherList,
          children: "Quà tặng của tôi",
        }}
      />
    </MerryChristmasWrapper>
  );
};
