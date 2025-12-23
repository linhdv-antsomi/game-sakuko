import React, { memo, useCallback } from "react";

import bgImage from "assets/images/catch-rewards/background-2.webp";

import iconLeaderImage from "assets/images/catch-rewards/icon-leaderboard.webp";
import iconShareImage from "assets/images/catch-rewards/icon-share.webp";
import iconGiftImage from "assets/images/catch-rewards/icon-gift.webp";
import styled from "styled-components";
import { motion } from "motion/react";
import { useRecoilState } from "recoil";
import { merryChristmasState, merryChristmasStateDefault } from "../../state";
import Barcode from "react-barcode";
import { Check, Copy } from "lucide-react";
import { copyToClipboard } from "utils";
import { Toast } from "@antscorp/ama-ui";
import { useNavigateWithSearch } from "hooks";
import { useRemainPlays } from "../../hooks";
import { SCREEN_KEYS } from "../../constants";
import { BaseScreen } from "../../types";
import { EVENT_CONFIG, PAGE_TYPE } from "constant";
import { ButtonBox } from "../MainMenu";

interface ResultsProps extends BaseScreen {}

const Wrapper = styled(motion.div)`
  font-family: "Barlow Condensed", "Barlow", sans-serif;
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

  .heading {
    width: 100%;
    background: #243771;
    border-radius: 11px;
    box-shadow: 0px 0px 3px 2px #ffffff4d inset;
    color: #ffffff;
    font-weight: 600;
    font-size: 30px;
    text-transform: capitalize;
    padding: 16px 30px;
    text-align: center;
    letter-spacing: 2px;
  }

  .voucher {
    width: 100%;
    background: #ffffff;
    border-radius: 15px;
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
  }
  .voucher-text {
    font-size: 16px;
    color: #243771;
    line-height: 18px;
    font-weight: 500;
  }
  .voucher-totalscore {
    color: #ed5691;
    display: contents;
  }

  .voucher-name {
    font-weight: 600;
    font-size: 23px;
    color: #ed5691;
  }

  .voucher-barcode-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    color: #000000;
  }
  .voucher-copy {
    display: flex;
    align-items: center;
    background: #f0f0f0;
    border-radius: 10px;
    gap: 10px;
    padding: 6px 14px;
  }

  .voucher-note {
    color: #777777;
    font-size: 14px;
  }
`;

const BtnPlay = styled(ButtonBox)`
  width: 100%;
  aspect-ratio: 390/46;
  background-color: #f05a92;
  color: #ffffff;
  font-weight: 700;
  font-size: clamp(20px, 6vw, 28px);
  line-height: 22px;
  margin-top: 23px;

  &.disabled {
    pointer-events: none;
    filter: grayscale(1);
    transform: none;
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
  margin-top: 13px;

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

export const Results: React.FC<ResultsProps> = memo(({ onShare }) => {
  const [
    { allocateVoucher, totalScore, isAllocatingCode = true },
    setMerryChristmas,
  ] = useRecoilState(merryChristmasState);
  const navigate = useNavigateWithSearch();
  const { isCanPlay } = useRemainPlays();

  // Variables
  const { name, result_title, promotion_code, result_description } =
    allocateVoucher?.webContents.contents || {};

  const onClickCopyCode = useCallback(() => {
    if (promotion_code) {
      copyToClipboard(promotion_code, {
        onSuccess: () => {
          Toast.show({
            icon: (
              <Check
                size={36}
                style={{
                  margin: "0px auto",
                }}
              />
            ),
            content: <div className="text-center">Sao chép mã thành công</div>,
            duration: 1000,
          });
        },
      });
    }
  }, [promotion_code]);

  const handleContinuePlay = useCallback(() => {
    if (!isCanPlay) {
      setMerryChristmas((prev) => ({
        ...merryChristmasStateDefault,
        prevState: prev.currentScreen,
        currentScreen: SCREEN_KEYS.MAIN_MENU,
      }));
      return;
    }

    setMerryChristmas((prev) => ({
      ...merryChristmasStateDefault,
      prevState: prev.currentScreen,
      currentScreen: SCREEN_KEYS.INSTRUCTIONS,
    }));
  }, [isCanPlay, setMerryChristmas]);

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
      pageCate: EVENT_CONFIG.MERRY_CHRISTMAS,
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
          Sakuko tặng bạn
        </motion.div>
        <motion.div
          className="voucher"
          variants={mainVariants(2)}
          initial="initial"
          animate="animate"
        >
          <div className="voucher-text">
            Bạn đã hứng được{" "}
            <div className="voucher-totalscore">{totalScore || 0} điểm</div>
            <br />
            <div className="voucher-text" style={{ textAlign: "center" }}>
              và nhận được
            </div>
          </div>
          <div className="voucher-name">{result_title || name}</div>
          <div className="voucher-barcode-wrapper">
            {promotion_code && (
              <>
                <Barcode
                  value={promotion_code}
                  displayValue={false}
                  height={60}
                  width={1}
                />
              </>
            )}
            <div className="voucher-copy" onClick={onClickCopyCode}>
              Sao chép mã <Copy size={16} />
            </div>
          </div>
          <div className="voucher-note">
            Kiểm tra ví quà tặng để biết thêm chi tiết
          </div>
        </motion.div>

        <BtnPlay
          variants={mainVariants(3)}
          initial="initial"
          animate="animate"
          whileTap={{ filter: "brightness(0.7)", y: 2 }}
          onClick={handleContinuePlay}
        >
          Chơi tiếp
        </BtnPlay>
        <div className="flex gap-2" style={{ marginTop: 13 }}>
          <BtnAddTurn
            variants={mainVariants(4)}
            initial="initial"
            animate="animate"
            whileTap={{ filter: "brightness(0.7)", y: 2 }}
            onClick={handleShare}
          >
            <img className="icon" src={iconShareImage} />
            <div>Thêm lượt</div>
          </BtnAddTurn>
          <BtnBXH
            variants={mainVariants(4)}
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
          variants={mainVariants(5)}
          initial="initial"
          animate="animate"
          whileTap={{ filter: "brightness(0.7)", y: 2 }}
          onClick={onClickRedirectVoucherList}
        >
          <img className="icon" src={iconGiftImage} />
          <div>Mở ví quà ngay</div>
        </BtnGift>
      </Content>
    </Wrapper>
  );
});

Results.displayName = "Results";
