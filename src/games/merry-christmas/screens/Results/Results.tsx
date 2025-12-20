import React, { memo, useCallback } from "react";

import bgImage from "assets/images/merry-christmas/background-3.webp";
import logoImage from "assets/images/merry-christmas/result-logo.webp";
import contentBgImage from "assets/images/merry-christmas/result-bg.webp";
import continueImage from "assets/images/merry-christmas/btn-continue.webp";
import bxhImage from "assets/images/merry-christmas/btn-bxh.webp";
import shareImage from "assets/images/merry-christmas/btn-share-3.webp";
import giftImage from "assets/images/merry-christmas/btn-gift.webp";
import styled from "styled-components";
import { motion } from "motion/react";
import { useRecoilState } from "recoil";
import { merryChristmasState, merryChristmasStateDefault } from "../../state";
import Barcode from "react-barcode";
import { CopyIcon } from "lucide-react";
import { copyToClipboard } from "utils";
import { SpinLoading, Toast } from "@antscorp/ama-ui";
import { DynamicParticlesBackground } from "../../components";
import { useNavigateWithSearch } from "hooks";
import { useRemainPlays } from "../../hooks";
import { SCREEN_KEYS } from "../../constants";
import { BaseScreen } from "../../types";
import { EVENT_CONFIG, PAGE_TYPE } from "constant";
import pineImage from "assets/images/merry-christmas/pine.webp";

interface ResultsProps extends BaseScreen {}

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
  aspect-ratio: 902/553;
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
`;

const Btn = styled(motion.button)`
  max-width: 100%;
`;

const TextScoreResult = styled.div`
  font-family: "Barlow", sans-serif;
  font-size: 13px;
`;

const Text = styled.div`
  font-family: "Barlow", sans-serif;
  font-size: 13px;
  font-weight: 500;
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
            icon: "success",
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
      <motion.div className="relative max-w-[77%] min-h-0">
        <Logo
          src={logoImage}
          className="z-10 h-full"
          variants={mainVariants(1)}
          initial="initial"
          animate="animate"
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
        exit={{ opacity: 0, transition: { duration: 0, delay: 0 } }}
      >
        {isAllocatingCode ? (
          <div className="flex flex-col items-center">
            <SpinLoading color="primary" />
            <Text className="mt-2">Đang phát thưởng ...</Text>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center max-w-[85%]">
            <Text>Bạn đã hứng được {totalScore || 0} điểm</Text>
            <Text className="text-[#9d070f] !font-semibold">Nhận ngay</Text>
            <Text className="text-[#9d070f] !font-bold line-clamp-2 !text-sm text-center">
              {result_title || name}
            </Text>
            <Text className="line-clamp-2 text-center text-xs">{`(${
              result_description || ""
            })`}</Text>
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
            <div className="flex items-center gap-1">
              <Text className="!font-semibold !text-sm">
                ID: {promotion_code}
              </Text>
              <CopyIcon
                className="w-3 h-3 text-black"
                onClick={onClickCopyCode}
              />
            </div>
          </div>
        )}
      </Content>
      <div className="flex flex-col gap-2 max-w-[55%] flex-grow-0 flex-shrink-0 z-10 mb-4">
        <Btn
          variants={mainVariants(3)}
          initial="initial"
          animate="animate"
          whileTap={{ filter: "brightness(0.7)", y: 2 }}
          onClick={handleContinuePlay}
        >
          <img src={continueImage} />
        </Btn>
        <Btn
          variants={mainVariants(4)}
          initial="initial"
          animate="animate"
          whileTap={{ filter: "brightness(0.7)", y: 2 }}
          onClick={goChampion}
        >
          <img src={bxhImage} />
        </Btn>
        <Btn
          variants={mainVariants(5)}
          initial="initial"
          animate="animate"
          whileTap={{ filter: "brightness(0.7)", y: 2 }}
          onClick={handleShare}
        >
          <img src={shareImage} />
        </Btn>
        <Btn
          variants={mainVariants(6)}
          initial="initial"
          animate="animate"
          whileTap={{ filter: "brightness(0.7)", y: 2 }}
          onClick={onClickRedirectVoucherList}
        >
          <img src={giftImage} />
        </Btn>
      </div>

      <DynamicParticlesBackground />
    </Wrapper>
  );
});

Results.displayName = "Results";
