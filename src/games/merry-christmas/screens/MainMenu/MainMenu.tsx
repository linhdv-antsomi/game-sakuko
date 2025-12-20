import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "motion/react";

import backgroundImage from "assets/images/merry-christmas/background.webp";
import christmasImage from "assets/images/merry-christmas/christmas.webp";
import bottomBackgroundImage from "assets/images/merry-christmas/bottom-background.webp";
import btnPlayImage from "assets/images/merry-christmas/btn-play.webp";
import btnBXHImage from "assets/images/merry-christmas/btn-bxh-2.webp";
import btnShareImage from "assets/images/merry-christmas/btn-share.webp";
import btnAddTurnImage from "assets/images/merry-christmas/btn-add-turn.webp";
import giftImage from "assets/images/merry-christmas/gift.webp";
import snowImage from "assets/images/merry-christmas/snow.webp";
import { DotBackground } from "../../styled";
import { Button, Checkbox, SpinLoading } from "@antscorp/ama-ui";
import { useImmer } from "use-immer";
import { useLocalStorage, useToggle } from "usehooks-ts";
import {
  APP_CONFIG,
  EVENT_CONFIG,
  LOCAL_STORAGE_KEY,
  PAGE_TYPE,
} from "constant";
import { useRecoilState, useRecoilValue } from "recoil";
import { merryChristmasState } from "../../state";
import { authenticationState } from "state";
import { useRemainPlays } from "../../hooks";
import {
  useAppConfig,
  useNavigateWithSearch,
  useRequestZaloPermissions,
  useUserInfo,
  useViewPage,
} from "hooks";
import { SCREEN_KEYS } from "../../constants";
import { SystemNotificationModal, TermAndConditionSheet } from "components";
import { closeApp } from "zmp-sdk/apis";
import { Snowfall } from "../../components";
import clsx from "clsx";
import { BaseScreen } from "../../types";

interface MainMenuProps extends BaseScreen {}

const MainMenuWrapper = styled(motion.div)`
  background: url(${backgroundImage}) no-repeat top center;
  background-size: cover;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  position: relative;
`;

const ChristmasLogo = styled(motion.img)``;

const ButtonWrapper = styled.div`
  background: url(${bottomBackgroundImage}) no-repeat top center;
  width: 100%;
  height: 40%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
`;

const BtnPlay = styled(motion.button)`
  background: url(${btnPlayImage}) no-repeat center / contain;
  aspect-ratio: 766/125;
  width: 65%;
  display: flex;
  align-items: center;
  justify-content: center;

  &.disabled {
    pointer-events: none;
    filter: grayscale(1);
    transform: none;
  }
`;
const BtnBXH = styled(motion.button)`
  background: url(${btnBXHImage}) no-repeat center / contain;
  aspect-ratio: 766/125;
  width: 65%;
  &.disabled {
    pointer-events: none;
    filter: grayscale(1);
    transform: none;
  }
`;
const BtnShare = styled(motion.button)`
  background: url(${btnShareImage}) no-repeat center / contain;
  aspect-ratio: 124/125;
  width: 11%;
`;
const BtnAddTurn = styled(motion.button)`
  background: url(${btnAddTurnImage}) no-repeat center / contain;
  aspect-ratio: 580/125;
  width: 49%;
`;

const ChildContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;

  background-color: #ffffffb0;
  color: #1c3a1c;
  padding: 3px 8px;
  border-radius: 8px;
`;

const CheckboxStyled = styled(Checkbox)`
  --icon-size: 20px;
  --font-size: 10px !important;
  --gap: 6px;

  width: 100%;

  .adm-checkbox-icon {
    border-radius: 2px !important;
    border-color: #1c3a1c !important;
    background-color: #1c3a1c !important;

    svg {
      vertical-align: top;
    }
  }
  .adm-checkbox-content {
    color: #1c3a1c !important;
    /* text-align: justify !important; */
    line-height: 1.2 !important;
    font-weight: 500;
  }
`;

const BtnGift = styled(motion.button)`
  background: url(${giftImage}) no-repeat center / contain;
  aspect-ratio: 73/82;
  width: 6%;
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

export const MainMenu: React.FC<MainMenuProps> = memo(({ onShare }) => {
  // State
  const [state, setState] = useImmer({
    requestPermissionVisible: false,
    limitRequestVisible: false,
  });
  const [merryChristmasConfig, setMerryChristmasConfig] = useLocalStorage(
    LOCAL_STORAGE_KEY.MERRY_CHRISTMAS,
    {
      isAcceptRule: false,
      isPhoneNumberAllowed: false,
      lastIdentifyDate: "",
    }
  );
  const [{ isGameLoading }, setMerryChristmas] =
    useRecoilState(merryChristmasState);

  // Hooks
  const { userInfo } = useUserInfo();
  const { remainPlays, isCanPlay } = useRemainPlays();
  const navigate = useNavigateWithSearch();
  const { appSettings, gameValidation } = useAppConfig();
  const [isRequestedZalo, setIsRequestedZalo] = useState(false);
  const [termAndConditionVisible, toggleTermAndConditionVisible] =
    useToggle(false);
  const [requestTermVisible, toggleRequestTermVisible] = useToggle(false);
  // const { requestZaloPermissions } = useRequestZaloPermissions({
  //   cdpEventConfig: {
  //     pageCate: EVENT_CONFIG.MERRY_CHRISTMAS,
  //   },
  //   onFail({ step, message, error }) {
  //     if (["flowOA", "allowPhone"].includes(step)) {
  //       setState((draft) => {
  //         draft.requestPermissionVisible = true;
  //       });
  //     }

  //     // If state code equal -203 it means user request so many times, then show limit Request message
  //     if (error.code === -203) {
  //       setState((draft) => {
  //         draft.limitRequestVisible = true;
  //         draft.requestPermissionVisible = false;
  //       });
  //     }

  //     setMerryChristmas((prev) => ({ ...prev, isGameLoading: false }));
  //   },
  //   onFinish() {
  //     console.log("request permission success");
  //     setState((draft) => {
  //       draft.limitRequestVisible = false;
  //       draft.requestPermissionVisible = false;
  //     });
  //     setIsRequestedZalo(true);

  //     setMerryChristmas((prev) => ({
  //       ...prev,
  //       currentScreen: SCREEN_KEYS.INSTRUCTIONS,
  //       isGameLoading: false,
  //     }));
  //   },
  // });
  useViewPage({
    pageType: PAGE_TYPE.HOME,
    pageCate: EVENT_CONFIG.MERRY_CHRISTMAS,
  });

  // Variables
  const { requestPermissionVisible, limitRequestVisible } = state;
  const { isAcceptRule } = merryChristmasConfig || {};
  const { termAndConditionTitle, termAndCondition } =
    appSettings?.games?.merryChristmas || {};
  const { systemErrorMessages } = appSettings?.globals || {};
  const disablePlay = !isCanPlay || !isAcceptRule || isGameLoading;

  useEffect(() => {
    if (!userInfo?.phoneNumber) {
      setMerryChristmasConfig((prev) => ({
        ...prev,
        isPhoneNumberAllowed: false,
      }));
    }
  }, [
    isRequestedZalo,
    setMerryChristmas,
    setMerryChristmasConfig,
    userInfo?.phoneNumber,
  ]);

  const onClickRedirectVoucherList = useCallback(() => {
    navigate("/gift", {
      newParams: {
        tab: "redeemed",
        voucherType: "voucher",
      },
    });
  }, [navigate]);

  // Handlers
  const onSuccess = useCallback(() => {
    console.log("request permission success");
    setState((draft) => {
      draft.limitRequestVisible = false;
      draft.requestPermissionVisible = false;
    });
    setIsRequestedZalo(true);

    setMerryChristmas((prev) => ({
      ...prev,
      currentScreen: SCREEN_KEYS.INSTRUCTIONS,
      isGameLoading: false,
    }));
  }, [setIsRequestedZalo, setMerryChristmas]);
  const onFail = useCallback(
    ({ step, message, error }) => {
      console.log("request permission failed", { step, message, error });
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

      setMerryChristmas((prev) => ({ ...prev, isGameLoading: false }));
    },
    [setMerryChristmas]
  );

  const onClickPlayGame = useCallback(() => {
    if (disablePlay) return;

    if (!isAcceptRule) {
      toggleRequestTermVisible();
      return;
    }

    setMerryChristmas((prev) => ({ ...prev, isGameLoading: true }));

    if (typeof window?.zma?.requestPermissions === "function") {
      window?.zma?.requestPermissions(onSuccess, onFail);
    }
    // requestZaloPermissions();
  }, [
    disablePlay,
    isAcceptRule,
    setMerryChristmas,
    // requestZaloPermissions,
    toggleRequestTermVisible,
  ]);

  const onClickTermAndCondition = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      toggleTermAndConditionVisible();
    },
    [toggleTermAndConditionVisible]
  );

  const handleViewAddTurn = useCallback(() => {
    setMerryChristmas((prev) => ({
      ...prev,
      currentScreen: SCREEN_KEYS.GUIDE,
    }));
  }, [setMerryChristmas]);
  const handleViewLeaderboard = useCallback(() => {
    setMerryChristmas((prev) => ({
      ...prev,
      currentScreen: SCREEN_KEYS.LEADER_BOARD,
    }));
  }, [setMerryChristmas]);
  const handleShare = useCallback(() => {
    if (onShare) {
      onShare({
        pageCate: EVENT_CONFIG.MERRY_CHRISTMAS,
        pageType: PAGE_TYPE.HOME,
      });
    }
  }, [onShare]);

  return (
    <>
      <MainMenuWrapper
        exit={{
          opacity: 0,
          transition: {
            duration: 0.5,
          },
        }}
      >
        <DotBackground
          className="z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.9 } }}
          exit={{ opacity: 0 }}
        />

        <Snowfall />

        <BtnGift
          className="absolute z-30 right-[4%] top-24"
          variants={mainVariants(1)}
          initial="initial"
          animate="animate"
          whileTap={{ filter: "brightness(0.7)", y: 2 }}
          onClick={onClickRedirectVoucherList}
        />

        <div className="flex justify-center items-center w-full -mb-[16%] z-10">
          <ChristmasLogo
            className="h-[85%]"
            variants={mainVariants(1)}
            initial="initial"
            animate="animate"
            src={christmasImage}
          />
        </div>

        {/* Bottom Buttons */}
        <ButtonWrapper className="pt-[16%]">
          <div className="flex flex-col items-center gap-2 w-full pb-3 z-10">
            <motion.div
              className="w-full flex justify-center items-center"
              variants={mainVariants(2)}
              initial="initial"
              animate="animate"
            >
              <BtnPlay
                animate={
                  disablePlay
                    ? { opacity: 0.5, scale: 1 }
                    : {
                        opacity: [1, 0.9, 1],
                        scale: [1, 1.08, 1],
                        filter: [
                          "brightness(1)",
                          "brightness(1.3)",
                          "brightness(1)",
                        ],
                      }
                }
                transition={{
                  duration: 1.2,
                  repeat: disablePlay ? 0 : Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                whileTap={{ filter: "brightness(0.7)", y: 2, scale: 1 }}
                className={clsx({
                  disabled: disablePlay,
                })}
                disabled={disablePlay}
                onClick={onClickPlayGame}
              >
                {isGameLoading && <SpinLoading color="white" />}
              </BtnPlay>
            </motion.div>

            <BtnBXH
              variants={mainVariants(3)}
              initial="initial"
              animate="animate"
              whileTap={{ filter: "brightness(0.7)", y: 2 }}
              onClick={handleViewLeaderboard}
            />

            <div className="flex justify-center gap-5 w-full">
              <BtnShare
                variants={mainVariants(4)}
                initial="initial"
                animate="animate"
                whileTap={{ filter: "brightness(0.7)", y: 2 }}
                onClick={handleShare}
              />
              <BtnAddTurn
                variants={mainVariants(4)}
                initial="initial"
                animate="animate"
                whileTap={{ filter: "brightness(0.7)", y: 2 }}
                onClick={handleViewAddTurn}
              />
            </div>

            <ChildContainer
              className="font-medium"
              variants={mainVariants(5)}
              initial="initial"
              animate="animate"
            >
              <CheckboxStyled
                checked={isAcceptRule}
                onChange={(checked) =>
                  setMerryChristmasConfig((prev) => ({
                    ...prev,
                    isAcceptRule: checked,
                  }))
                }
                onClick={(e) => e.stopPropagation()}
              >
                Tôi xác nhận đọc hiểu, đồng ý với các
                <div
                  className="underline inline-block"
                  onClick={onClickTermAndCondition}
                >
                  điều khoản và điều kiện
                </div>{" "}
                của chương trình
              </CheckboxStyled>
            </ChildContainer>

            <ChildContainer
              className="text-[12px] !rounded-md !py-1 font-medium"
              variants={mainVariants(6)}
              initial="initial"
              animate="animate"
            >
              {`Bạn còn ${Math.max(remainPlays, 0)} lượt chơi ngày hôm nay`}
            </ChildContainer>
          </div>
        </ButtonWrapper>
      </MainMenuWrapper>

      {/* Game Guide */}
      <TermAndConditionSheet
        visible={termAndConditionVisible}
        title={
          termAndConditionTitle ||
          APP_CONFIG.GAMES.MERRY_CHRISTMAS.TERM_AND_CONDITION_TITLE
        }
        showCloseButton={false}
        onClose={(e) => {
          e.stopPropagation();
          toggleTermAndConditionVisible();
        }}
        style={{ fontFamily: '"Barlow Condensed", sans-serif' }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html:
              termAndCondition ||
              APP_CONFIG.GAMES.MERRY_CHRISTMAS.TERM_AND_CONDITION,
          }}
        ></div>
      </TermAndConditionSheet>

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
                APP_CONFIG.SYSTEM_ERROR_MESSAGES.requestPermission ||
                systemErrorMessages?.requestPermission ||
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

      {/* End Game Notification */}
      <SystemNotificationModal
        showCloseButton={false}
        visible={gameValidation && !gameValidation?.merryChristmas?.valid}
        title="Thông báo"
        description={
          systemErrorMessages?.merryChristmasEnd ||
          APP_CONFIG.SYSTEM_ERROR_MESSAGES.merryChristmasEnd
        }
        onClose={() => closeApp()}
        retryButtonProps={{
          onClick: onClickRedirectVoucherList,
          children: "Quà tặng của tôi",
        }}
      ></SystemNotificationModal>

      {/* Request Accept Term of Condition */}
      <SystemNotificationModal
        showCloseButton={false}
        visible={requestTermVisible}
        title="Thông báo"
        description={
          systemErrorMessages?.requestAcceptTerms ||
          APP_CONFIG.SYSTEM_ERROR_MESSAGES.requestAcceptTerms
        }
        maskClosable={false}
        showRetryButton={false}
        onClose={() => toggleRequestTermVisible()}
      >
        <Button
          shape="rounded"
          color="primary"
          block
          className="!mt-5"
          onClick={() => toggleRequestTermVisible()}
        >
          Đóng
        </Button>
      </SystemNotificationModal>
    </>
  );
});

MainMenu.displayName = "MainMenu";
