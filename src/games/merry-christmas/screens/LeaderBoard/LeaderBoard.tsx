import React, { memo, useCallback, useEffect, useMemo, useState } from "react";

import bgImage from "assets/images/catch-rewards/background-2.webp";
import bxhImage from "assets/images/catch-rewards/bxh.webp";
import iconShareImage from "assets/images/catch-rewards/icon-share.webp";
import avatarImage from "assets/images/catch-rewards/avatar.webp";
import styled from "styled-components";
import { motion } from "motion/react";
import { BtnBack } from "../../components";
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
import { useGetCanPlay, useGetLeaderBoard } from "queries";
import { SystemNotificationModal } from "components";
import { Button } from "@antscorp/ama-ui";
import { closeApp } from "zmp-sdk/apis";
import { BaseScreen } from "../../types";
import { ButtonBox } from "../MainMenu";

interface LeaderBoardProps extends BaseScreen {}

const Wrapper = styled(motion.div)`
  background: url(${bgImage}) bottom center / cover no-repeat;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding-top: calc(var(--header-padding-top) + 30px);
`;

const BxhWrapper = styled(motion.div)`
  background: url(${bxhImage}) no-repeat center / contain;
  width: 86%;
  aspect-ratio: 1134/1527;
  position: relative;
`;

const ItemsWrapper = styled.div`
  position: absolute;
  top: 21.5%;
  left: 8%;
  width: 84%;
  height: 55%;

  display: flex;
  flex-direction: column;
  gap: 3%;
`;

const Item = styled.div<{ $player: any }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 18%;
  border-radius: 10px;
  padding: 3px 16px;

  .rank {
    font-size: 26px;
    height: 20px;
    width: 10px;
    font-weight: 700;
    color: ${({ $player }) => ($player.rank <= 3 ? "#ffffff" : "#243771")};
  }
  .avatar {
    aspect-ratio: 1/1;
    width: 13%;
    margin-left: 16px;
  }
  .name {
    color: #243771;
    font-weight: 700;
    font-size: 16px;
    margin-left: 13px;
    width: 50%;
    max-width: 50%;
  }
  .score {
    margin-left: auto;
    font-weight: 600;
    font-size: 16px;
    color: #243771;
  }
`;

const MyRank = styled.div`
  position: absolute;
  top: 79%;
  left: 8%;
  width: 84%;
  height: 5%;

  color: #ffffff;
  font-weight: 700;
  font-size: 19px;
  text-align: center;
`;

const BtnPlay = styled(ButtonBox)`
  aspect-ratio: 274/46;
  width: 62%;
  background-color: #f05a92;
  color: #ffffff;
  font-weight: 700;
  font-size: clamp(20px, 6vw, 28px);
  line-height: 22px;

  &.disabled {
    pointer-events: none;
    filter: grayscale(1);
    transform: none;
  }
`;

const BtnShare = styled(ButtonBox)`
  aspect-ratio: 274/46;
  width: 62%;
  background-color: #ffffff;
  font-size: clamp(14px, 4vw, 19px);
  font-weight: 600;
  line-height: 22px;
  gap: 4px;
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
  const { userInfo } = useUserInfo();
  const { data: leaderBoardData } = useGetLeaderBoard({
    options: {
      refetchOnMount: "always",
    },
  });
  const [merryChristmasConfig, setMerryChristmasConfig] = useLocalStorage(
    APP_CONFIG.GAME_ID,
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
  const { data: canPlayData } = useGetCanPlay();
  const { requestZaloPermissions } = useRequestZaloPermissions({
    cdpEventConfig: {
      pageCate: EVENT_CONFIG.CATCH_REWARDS,
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
  const { canPlay } = canPlayData?.data || {};

  // Trackings
  useViewPage({
    pageType: PAGE_TYPE.LEADER_BOARD,
    pageCate: EVENT_CONFIG.CATCH_REWARDS,
  });

  // Effects
  useEffect(() => {
    console.log("🚀 ~ useEffect ~ isRequestedZalo:", userInfo?.phoneNumber);
    if (!userInfo?.phoneNumber && !window?.zma?.PREVIEW_MODE) {
      setMerryChristmasConfig((prev) => ({
        ...prev,
        isPhoneNumberAllowed: false,
      }));
    }

    if (
      isRequestedZalo &&
      (userInfo?.phoneNumber || window?.zma?.PREVIEW_MODE)
    ) {
      setMerryChristmasState((prev) => ({
        ...prev,
        currentScreen: SCREEN_KEYS.INSTRUCTIONS,
        isGameLoading: false,
      }));
    }
  }, [
    isRequestedZalo,
    setMerryChristmasConfig,
    setMerryChristmasState,
    userInfo?.phoneNumber,
  ]);

  // Memos
  const [leaderBoardItems, myRankInfo] = useMemo(() => {
    const myRank = leaderBoardData?.data?.userRank;
    const arrRankData = leaderBoardData?.data?.leaderboard || [];
    const arrRankSorted = arrRankData
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 3);

    // if (Array.isArray(arrRankData) && userInfo?.id) {
    //   myRank = arrRankData.find((item) => item.userId === userInfo?.id);
    // }
    return [arrRankSorted, myRank];
  }, [leaderBoardData]);

  // Handlers
  const onClickPlayGame = useCallback(() => {
    if (!isAcceptRule || !canPlay) {
      setMerryChristmasState((prev) => ({
        ...prev,
        currentScreen: SCREEN_KEYS.MAIN_MENU,
      }));
      return;
    }

    requestZaloPermissions();
  }, [requestZaloPermissions, setMerryChristmasState, isAcceptRule, canPlay]);

  const handleShare = useCallback(() => {
    if (onShare) {
      onShare({
        pageType: PAGE_TYPE.LEADER_BOARD,
        pageCate: EVENT_CONFIG.CATCH_REWARDS,
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
        <BxhWrapper
          variants={mainVariants(1)}
          initial="initial"
          animate="animate"
        >
          <ItemsWrapper>
            {leaderBoardItems.map((player) => (
              <Item key={player.userId} $player={player}>
                <div className="rank">{player.rank}</div>
                <div className="avatar">
                  <img src={player.avatar || avatarImage} />
                </div>
                <div className="name line-clamp-1">
                  {player.name || "Guest"}
                </div>
                <div className="score">
                  {Number(player.score).toLocaleString("vi-VN") || 0}
                </div>
              </Item>
            ))}
          </ItemsWrapper>

          <MyRank>Xếp hạng của bạn: #{myRankInfo?.rank || 0}</MyRank>
        </BxhWrapper>

        <BtnPlay
          variants={mainVariants(2)}
          initial="initial"
          animate="animate"
          whileTap={{ filter: "brightness(0.7)", y: 2 }}
          onClick={onClickPlayGame}
        >
          Chơi ngay
        </BtnPlay>

        <BtnShare
          variants={mainVariants(3)}
          initial="initial"
          animate="animate"
          whileTap={{ filter: "brightness(0.7)", y: 2 }}
          onClick={handleShare}
        >
          <img className="icon" src={iconShareImage} />
          <div>Chia sẻ ngay</div>
        </BtnShare>
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
