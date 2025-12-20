import React, { memo, useCallback, useEffect, useMemo, useState } from "react";

import bgImage from "assets/images/merry-christmas/background-3.webp";
import logoImage from "assets/images/merry-christmas/bxh-logo.webp";
import contentBgImage from "assets/images/merry-christmas/result-bg.webp";
import contentLogoImage from "assets/images/merry-christmas/bxh-content-logo.webp";
import playImage from "assets/images/merry-christmas/btn-play-2.webp";
import shareImage from "assets/images/merry-christmas/btn-share-2.webp";
import addTurnImage from "assets/images/merry-christmas/btn-share-4.webp";
import avatarImage from "assets/images/merry-christmas/avatar.webp";
import styled from "styled-components";
import { motion } from "motion/react";
import { BtnBack, DynamicParticlesBackground } from "../../components";
import { useRecoilState, useRecoilValue } from "recoil";
import { merryChristmasState } from "../../state";
import { SCREEN_KEYS } from "../../constants";
import { useLocalStorage } from "usehooks-ts";
import {
  APP_CONFIG,
  EVENT_CONFIG,
  LOCAL_STORAGE_KEY,
  PAGE_TYPE,
} from "constant";
import { useImmer } from "use-immer";
import {
  useAppConfig,
  useRequestZaloPermissions,
  useUserInfo,
  useViewPage,
} from "hooks";
import { authenticationState } from "state";
import { useRemainPlays } from "../../hooks";
import { useGetLeaderBoardChristmas } from "queries";
import { SystemNotificationModal } from "components";
import { Button } from "@antscorp/ama-ui";
import { closeApp } from "zmp-sdk/apis";
import { BaseScreen } from "../../types";
import pineImage from "assets/images/merry-christmas/pine.webp";

interface LeaderBoardProps extends BaseScreen {

}

const Wrapper = styled(motion.div)`
  font-family: "Barlow Condensed", "Barlow", sans-serif;
  background: url(${bgImage}) bottom center / cover no-repeat;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding-top: calc(var(--header-padding-top) + 30px);
`;

const Logo = styled(motion.img)`
  mix-blend-mode: lighten;
  /* max-width: 77%; */
  /* flex: 1 1 auto; */
  min-height: 0;
`;

const Content = styled(motion.div)`
  background: url(${contentBgImage}) no-repeat center / contain;
  aspect-ratio: 830/1039;
  max-width: 72%;
  width: 100%;
  flex: 0 0 auto;
  min-height: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const ContentLogo = styled(motion.img)``;

const Person = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-width: 30%;
  flex: 1;
`;
const PersonAvatar = styled(motion.img)`
  border-radius: 50%;
  aspect-ratio: 1/1;
  max-width: 50px;
  align-self: center;
`;
const PersonName = styled(motion.div)`
  font-weight: 600;
  font-size: 14px;
  text-align: center;
`;
const MyRankText = styled(motion.div)`
  font-weight: 600;
  font-size: 16px;
  color: #5b6e74;
`;

const Btn = styled(motion.button)`
  max-width: 100%;
`;

const mainVariants = (index = 0) => ({
  initial: {
    opacity: 0,
    scale: 0.7,
  },
  animate: {
    opacity: 1,
    scale: [0.7, 1.1, 1],
    transition: {
      duration: 0.6,
      delay: 0.4 * index,
    },
  },
});

export const LeaderBoard: React.FC<LeaderBoardProps> = memo(({ onShare }) => {
  const [christmasState, setMerryChristmasState] =
    useRecoilState(merryChristmasState);
  const { userInfo: userInfo } = useUserInfo();
  const { data: leaderBoardData } = useGetLeaderBoardChristmas({
    options: {
      refetchOnMount: "always",
    },
  });
  const [merryChristmasConfig, setMerryChristmasConfig] = useLocalStorage(
    LOCAL_STORAGE_KEY.MERRY_CHRISTMAS,
    {
      isAcceptRule: false,
      isPhoneNumberAllowed: false,
      lastIdentifyDate: "",
    }
  );
  const [state, setState] = useImmer({
    requestPermissionVisible: false,
    limitRequestVisible: false,
  });
  const [isRequestedZalo, setIsRequestedZalo] = useState(false);
  const { appSettings } = useAppConfig();
  const { user } = useRecoilValue(authenticationState);
  const { isCanPlay } = useRemainPlays();
  const { requestZaloPermissions } = useRequestZaloPermissions({
    cdpEventConfig: {
      pageCate: EVENT_CONFIG.MERRY_CHRISTMAS,
    },
    onFail({ step, message, error }) {
      if (["flowOA", "allowPhone"].includes(step)) {
        setState((draft) => {
          draft.requestPermissionVisible = true;
        });
      }

      // If state code equal -203 it means user request so many times, then show limit Request message
      if (error.code === -203) {
        setState((draft) => {
          draft.limitRequestVisible = true;
          draft.requestPermissionVisible = false;
        });
      }

      setMerryChristmasState((prev) => ({
        ...prev,
        isGameLoading: false,
      }));
    },
    onFinish() {
      console.log("request permission success");
      setState((draft) => {
        draft.limitRequestVisible = false;
        draft.requestPermissionVisible = false;
      });
      setIsRequestedZalo(true);

      setMerryChristmasState((prev) => ({
        ...prev,
        isGameLoading: false,
      }));
    },
  });

  // Variables
  const { isAcceptRule = false } = merryChristmasConfig;
  const { requestPermissionVisible, limitRequestVisible } = state;
  const { systemErrorMessages } = appSettings?.globals || {};

  // Trackings
  useViewPage({
    pageType: PAGE_TYPE.LEADER_BOARD,
    pageCate: EVENT_CONFIG.MERRY_CHRISTMAS,
  });

  // Effects
  useEffect(() => {
    if (!user?.phone) {
      setMerryChristmasConfig((prev) => ({
        ...prev,
        isPhoneNumberAllowed: false,
      }));
    }

    if (isRequestedZalo && user?.phone) {
      setMerryChristmasState((prev) => ({
        ...prev,
        currentScreen: SCREEN_KEYS.INSTRUCTIONS,
        isGameLoading: false,
      }));
    }
  }, [isRequestedZalo, setMerryChristmasConfig, setMerryChristmasState, user]);

  // Memos
  const [leaderBoardItems, myRankInfo] = useMemo(() => {
    let myRank;
    const arrRankData = leaderBoardData?.data || [];
    const arrRankSorted = arrRankData
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 3);

    if (Array.isArray(arrRankData) && userInfo?.id) {
      myRank = arrRankData.find((item) => item.userId === userInfo?.id);
    }
    return [arrRankSorted, myRank];
  }, [leaderBoardData, userInfo?.id]);

  // Handlers
  const onClickPlayGame = useCallback(() => {
    if (!isAcceptRule || !isCanPlay) {
      setMerryChristmasState((prev) => ({
        ...prev,
        currentScreen: SCREEN_KEYS.MAIN_MENU,
      }));
      return;
    }

    requestZaloPermissions();
  }, [requestZaloPermissions, setMerryChristmasState, isAcceptRule, isCanPlay]);

  const handleShare = useCallback(() => {
    if (onShare) {
      onShare({
        pageType: PAGE_TYPE.LEADER_BOARD,
        pageCate: EVENT_CONFIG.MERRY_CHRISTMAS,
      });
    }
  }, [onShare]);

  return (
    <>
      <Wrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <BtnBack
          className="absolute left-7 top-[calc(var(--header-padding-top)+32px)] w-5 h-5"
          onBack={() =>
            setMerryChristmasState((prev) => ({
              ...prev,
              currentScreen: SCREEN_KEYS.MAIN_MENU,
            }))
          }
        />
        <motion.div className="relative max-w-[77%] min-h-0">
          <Logo
            className="z-10 h-full"
            variants={mainVariants(1)}
            initial="initial"
            animate="animate"
            src={logoImage}
          />
          <motion.img
            className="absolute bottom-[6%] left-0 scale-[1.05]"
            variants={mainVariants(1)}
            initial="initial"
            animate="animate"
            src={pineImage}
          />
        </motion.div>
        <Content
          className="z-10"
          variants={mainVariants(2)}
          initial="initial"
          animate="animate"
        >
          <ContentLogo className="max-w-[55%]" src={contentLogoImage} />
          <div className="flex w-[75%] justify-around gap-2">
            {leaderBoardItems.map((player) => (
              <Person key={player.userId}>
                <PersonAvatar src={player.avatar || avatarImage} />
                <PersonName className="line-clamp-2">
                  {player.name || "Guest"}
                </PersonName>
              </Person>
            ))}
          </div>
          <MyRankText>Xếp hạng của bạn: #{myRankInfo?.rank || 0}</MyRankText>
        </Content>
        <div className="flex flex-col gap-4 max-w-[55%] flex-grow-0 flex-shrink-0 z-10 mb-6">
          <Btn
            variants={mainVariants(3)}
            initial="initial"
            animate="animate"
            whileTap={{ filter: "brightness(0.7)", y: 2 }}
            onClick={onClickPlayGame}
          >
            <img src={playImage} />
          </Btn>

          <div className="flex gap-2">
            <Btn
              variants={mainVariants(4)}
              initial="initial"
              animate="animate"
              whileTap={{ filter: "brightness(0.7)", y: 2 }}
              onClick={handleShare}
            >
              <img src={shareImage} />
            </Btn>
            <Btn
              variants={mainVariants(4)}
              initial="initial"
              animate="animate"
              whileTap={{ filter: "brightness(0.7)", y: 2 }}
              onClick={handleShare}
            >
              <img src={addTurnImage} />
            </Btn>
          </div>
        </div>

        <DynamicParticlesBackground />
      </Wrapper>

      {/* Request Permission Notification */}
      <SystemNotificationModal
        showCloseButton={false}
        showRetryButton={false}
        visible={requestPermissionVisible}
        maskClosable={true}
        onClose={() => {
          setState((draft) => {
            draft.requestPermissionVisible = false;
          });
        }}
        title="Điều Khoản"
        description={
          <span
            dangerouslySetInnerHTML={{
              __html:
                systemErrorMessages?.requestPermission ||
                APP_CONFIG.SYSTEM_ERROR_MESSAGES.requestPermission ||
                "",
            }}
          />
        }
      >
        <div>
          <Button color="primary" block onClick={onClickPlayGame}>
            Bắt đầu
          </Button>
        </div>
      </SystemNotificationModal>

      {/* Limit Request Notification */}
      <SystemNotificationModal
        showCloseButton={false}
        visible={limitRequestVisible}
        title="Thông báo"
        description={
          systemErrorMessages?.limitRequest ||
          APP_CONFIG.SYSTEM_ERROR_MESSAGES.limitRequest
        }
        maskClosable={false}
        showRetryButton={false}
        onClose={() => closeApp()}
      >
        <Button
          shape="rounded"
          color="primary"
          block
          className="!mt-5"
          onClick={() => closeApp()}
        >
          Đóng
        </Button>
      </SystemNotificationModal>
    </>
  );
});

LeaderBoard.displayName = "LeaderBoard";
