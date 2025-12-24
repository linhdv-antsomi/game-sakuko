// Libraries
import React, { memo, useCallback } from "react";
import { motion } from "motion/react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

// Constants
import { EVENT_CONFIG, PAGE_TYPE } from "constant";
import { SCREEN_KEYS } from "games/merry-christmas/constants";

// States
import {
  merryChristmasState,
  merryChristmasStateDefault,
} from "games/merry-christmas/state";

// Types
import { BaseScreen } from "games/merry-christmas/types";

// Hooks
import { useNavigateWithSearch } from "hooks";

// Components
import { ButtonBox } from "../MainMenu";

// Assets
import bgImage from "assets/images/catch-rewards/background-2.webp";
import failImage from "assets/images/catch-rewards/failed.webp";
import iconLeaderImage from "assets/images/catch-rewards/icon-leaderboard.webp";
import iconShareImage from "assets/images/catch-rewards/icon-share.webp";
import iconGiftImage from "assets/images/catch-rewards/icon-gift.webp";

interface ResultFailProps extends BaseScreen {}

const Wrapper = styled(motion.div)`
  background: url(${bgImage}) bottom center / cover no-repeat;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding-top: calc(var(--header-padding-top) + 30px);
`;

const Content = styled(motion.div)`
  width: 88%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .heading {
    width: fit-content;
    background: #243771;
    border-radius: 11px;
    box-shadow: 0px 0px 3px 2px #ffffff4d inset;
    color: #ffffff;
    font-weight: 600;
    font-size: clamp(28px, 8.6vw, 38px);
    padding: 16px 30px;
    text-align: center;
    letter-spacing: 2px;
    z-index: 1;
  }

  .notify {
    width: 100%;
    background: #ffffff;
    border-radius: 15px;
    padding: 44px 36px 18px;
    box-shadow: 0px 4px 4px 0px #d97b9640, 0px 0px 1px 1px #d2d2d233 inset;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -20px;
  }

  .notify-title {
    color: #243771;
    font-weight: 600;
    font-size: clamp(18px, 5vw, 25px);
    line-height: 1.5;
    text-align: center;
  }
  .notify-img-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .notify-img-below {
    background: #f05a92;
    box-shadow: 0px 4px 4px 0px #d97b9640, 0px 0px 6px 2px #ffffff66 inset;
    border-radius: 100%;
    width: 70%;
    aspect-ratio: 1/1;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .notify-img {
    width: 61%;
    z-index: 1;
  }

  .notify-text {
    color: #243771;
    font-weight: 500;
    font-size: clamp(12px, 3.6vw, 16px);
    line-height: 1.5;
    text-align: center;
  }

  .button-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    margin-top: 20px;
  }
  .button-wrapper-hoz {
    display: flex;
    gap: 6px;
  }
`;

const BtnAddTurn = styled(ButtonBox)`
  aspect-ratio: 192/46;
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
const BtnBXH = styled(ButtonBox)`
  aspect-ratio: 192/46;
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

const BtnGift = styled(ButtonBox)`
  aspect-ratio: 390/46;
  width: 100%;
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

  .icon {
    width: 15px;
    height: 15px;
  }
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

export const ResultFail: React.FC<ResultFailProps> = memo(({ onShare }) => {
  const [{ totalScore }, setMerryChristmas] =
    useRecoilState(merryChristmasState);
  const navigate = useNavigateWithSearch();

  const goChampion = () => {
    setMerryChristmas((prev) => ({
      ...merryChristmasStateDefault,
      prevState: prev.currentScreen,
      currentScreen: SCREEN_KEYS.LEADER_BOARD,
    }));
  };

  const onClickRedirectVoucherList = useCallback(() => {
    navigate("/gift", {
      newParams: {
        tab: "redeemed",
        voucherType: "voucher",
      },
    });
  }, [navigate]);

  const handleShare = useCallback(() => {
    onShare?.({
      pageCate: EVENT_CONFIG.CATCH_REWARDS,
      pageType: PAGE_TYPE.GIFT_CODE,
    });
  }, [onShare]);

  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Content>
        <motion.div
          className="heading"
          variants={mainVariants(1)}
          initial="initial"
          animate="animate"
        >
          {totalScore || 0} điểm
        </motion.div>
        <motion.div
          className="notify"
          variants={mainVariants(1)}
          initial="initial"
          animate="animate"
        >
          <div className="notify-title">
            Chút xíu nữa <br /> là đủ điểm nhận quà rồi!
          </div>
          <div className="notify-img-wrapper">
            <div className="notify-img-below"></div>
            <img className="notify-img" src={failImage} alt="result fail" />
          </div>
          <div className="notify-text">
            Hãy làm thêm nhiệm vụ hoặc quay lại vào ngày mai để thêm lượt nhé!
          </div>
        </motion.div>

        <div className="button-wrapper">
          <div className="button-wrapper-hoz">
            <BtnAddTurn
              variants={mainVariants(2)}
              initial="initial"
              animate="animate"
              whileTap={{ filter: "brightness(0.7)", y: 2 }}
              onClick={handleShare}
            >
              <img className="icon" src={iconShareImage} />
              <div>Thêm lượt</div>
            </BtnAddTurn>
            <BtnBXH
              variants={mainVariants(2)}
              initial="initial"
              animate="animate"
              whileTap={{ filter: "brightness(0.7)", y: 2 }}
              onClick={goChampion}
            >
              <img className="icon" src={iconLeaderImage} />
              <div>Bảng xếp hạng</div>
            </BtnBXH>
          </div>
          <BtnGift
            variants={mainVariants(3)}
            initial="initial"
            animate="animate"
            whileTap={{ filter: "brightness(0.7)", y: 2 }}
            onClick={onClickRedirectVoucherList}
          >
            <img className="icon" src={iconGiftImage} />
            <div>Mở ví quà ngay</div>
          </BtnGift>
        </div>
      </Content>
    </Wrapper>
  );
});

ResultFail.displayName = "ResultFail";
