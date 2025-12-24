import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "motion/react";

// Assets
import backgroundImage from "assets/images/catch-rewards/background.webp";
import logoImage from "assets/images/catch-rewards/logo.webp";
import iconLeaderImage from "assets/images/catch-rewards/icon-leaderboard.webp";
import iconShareImage from "assets/images/catch-rewards/icon-share.webp";

import { Button, Checkbox, Image, SpinLoading } from "@antscorp/ama-ui";
import { useImmer } from "use-immer";
import { useLocalStorage, useToggle } from "usehooks-ts";
import {
  APP_CONFIG,
  EVENT_CONFIG,
  LOCAL_STORAGE_KEY,
  PAGE_TYPE,
} from "constant";
import { useRecoilState } from "recoil";
import { merryChristmasState } from "../../state";
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
import clsx from "clsx";
import { BaseScreen } from "../../types";

interface MainMenuProps extends BaseScreen {}

const MainMenuWrapper = styled(motion.div)`
  background: url(${backgroundImage}) no-repeat center center;
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

const LogoWrapper = styled(motion.div)`
  position: absolute;
  width: 33%;
  top: 4%;
  left: 50%;
  transform: translateX(-50%);
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;
  flex: 0 0 auto;
  padding-bottom: 5%;
`;

export const ButtonBox = styled(motion.button)`
  aspect-ratio: 267/46;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #243771;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px #d97b9640, 0px 0px 6px 2px #ffffff66 inset;

  .icon {
    width: clamp(10px, 3.3vw, 15px);
    height: clamp(10px, 3.3vw, 15px);
  }
`;

const BtnPlayWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnPlay = styled(ButtonBox)`
  background-color: #f05a92;
  color: #ffffff;
  font-weight: 700;
  font-size: clamp(20px, 6vw, 28px);
  line-height: 22px;
  position: relative;

  &.disabled {
    pointer-events: none;
    filter: grayscale(1);
    transform: none;
  }
`;
const BtnBXH = styled(ButtonBox)`
  background-color: #ffffff;
  font-size: clamp(14px, 4vw, 19px);
  font-weight: 600;
  line-height: 22px;
  gap: 4px;

  &.disabled {
    pointer-events: none;
    filter: grayscale(1);
    transform: none;
  }
`;
const BtnShare = styled(ButtonBox)`
  background-color: #ffffff;
  font-size: clamp(14px, 4vw, 19px);
  font-weight: 600;
  line-height: 22px;
  gap: 4px;
`;

const ChildContainer = styled(ButtonBox)`
  background-color: #ffffff;
  color: #243771;
  padding: 0px 10px;
`;

const CheckboxStyled = styled(Checkbox)`
  --icon-size: 19px;
  --font-size: clamp(10px, 3vw, 14px) !important;
  --gap: 10px;

  width: 100%;

  .adm-checkbox-icon {
    border-radius: 6px !important;
    border-color: #243771 !important;
    background-color: #243771 !important;

    svg {
      vertical-align: top;
    }
  }
  .adm-checkbox-content {
    color: #243771 !important;
    text-align: left !important;
    line-height: 17px !important;
    font-weight: 500;
  }
  .terms {
    display: contents;
  }
`;

const RemainPlays = styled.div`
  color: #ffffff;
  font-weight: 700;
  font-size: 15px;
  line-height: 1.2;
  box-shadow: 0px 3px 3px 0px #d97b9666;
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
  const { appSettings, gameValidation, isCatchRewardsValid } = useAppConfig();
  const [isRequestedZalo, setIsRequestedZalo] = useState(false);
  const [termAndConditionVisible, toggleTermAndConditionVisible] =
    useToggle(false);
  const [requestTermVisible, toggleRequestTermVisible] = useToggle(false);
  const { requestZaloPermissions } = useRequestZaloPermissions({
    cdpEventConfig: {
      pageCate: EVENT_CONFIG.MERRY_CHRISTMAS,
    },
    onFail({ step, message, error }) {
      console.log("request permission fail");
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
    onFinish() {
      console.log("request permission success");
      setState((draft) => {
        draft.limitRequestVisible = false;
        draft.requestPermissionVisible = false;
      });
      setIsRequestedZalo(true);

      setMerryChristmas((prev) => ({
        ...prev,
        isGameLoading: false,
      }));
    },
  });

  useViewPage({
    pageType: PAGE_TYPE.HOME,
    pageCate: EVENT_CONFIG.MERRY_CHRISTMAS,
  });

  // Variables
  const { requestPermissionVisible, limitRequestVisible } = state;
  const { isAcceptRule } = merryChristmasConfig || {};
  const { termAndConditionTitle, termAndCondition } =
    appSettings?.games?.catchRewards || {};
  const { systemErrorMessages } = appSettings?.globals || {};
  const disablePlay = !isCanPlay || !isAcceptRule || isGameLoading;

  useEffect(() => {
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
      setMerryChristmas((prev) => ({
        ...prev,
        currentScreen: SCREEN_KEYS.INSTRUCTIONS,
        isGameLoading: false,
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
  const onClickPlayGame = useCallback(() => {
    if (disablePlay) return;

    if (!isAcceptRule) {
      toggleRequestTermVisible();
      return;
    }

    setMerryChristmas((prev) => ({ ...prev, isGameLoading: true }));

    requestZaloPermissions();
  }, [
    disablePlay,
    isAcceptRule,
    setMerryChristmas,
    requestZaloPermissions,
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
        <LogoWrapper className="logo-wrapper">
          <Image src={logoImage} />
        </LogoWrapper>

        <ButtonWrapper>
          <BtnPlayWrapper
            variants={mainVariants(1)}
            initial="initial"
            animate="animate"
          >
            <BtnPlay
              animate={
                disablePlay
                  ? { opacity: 0.5, scale: 1 }
                  : {
                      opacity: [1, 0.9, 1],
                      // scale: [1, 1.08, 1],
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
              {isGameLoading && (
                <SpinLoading
                  color="white"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    "--size": "24px",
                  }}
                />
              )}
              Tham gia
            </BtnPlay>
          </BtnPlayWrapper>

          <ChildContainer
            className="font-medium"
            variants={mainVariants(2)}
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
              Tôi đồng ý với&nbsp;
              <div className="terms contents" onClick={onClickTermAndCondition}>
                điều kiện và điều khoản
              </div>
              &nbsp;của chương trình
            </CheckboxStyled>
          </ChildContainer>

          <BtnBXH
            variants={mainVariants(3)}
            initial="initial"
            animate="animate"
            whileTap={{ filter: "brightness(0.7)", y: 2 }}
            onClick={handleViewLeaderboard}
          >
            <img className="icon" src={iconLeaderImage} />
            <div>Bảng xếp hạng</div>
          </BtnBXH>

          <BtnShare
            variants={mainVariants(4)}
            initial="initial"
            animate="animate"
            whileTap={{ filter: "brightness(0.7)", y: 2 }}
            onClick={handleShare}
          >
            <img className="icon" src={iconShareImage} />
            <div>Chia sẻ với bạn bè</div>
          </BtnShare>
          <RemainPlays>Số lượt chơi: {remainPlays}</RemainPlays>
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
        visible={!isCatchRewardsValid}
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
