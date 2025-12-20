import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "motion/react";

import backgroundImage from "assets/images/merry-christmas/background.webp";
import giftImage from "assets/images/merry-christmas/gift.webp";
import bottomBackgroundImage from "assets/images/merry-christmas/bottom-background.webp";
import intrucstionsImage from "assets/images/merry-christmas/instructions.webp";
import btnStartImage from "assets/images/merry-christmas/btn-start.webp";
import {
  useNavigateWithSearch,
  useRegisterLoyaltyCustomer,
  useViewPage,
} from "hooks";
import { useRemainPlays } from "../../hooks";
import { SCREEN_KEYS } from "../../constants";
import { useRecoilState } from "recoil";
import { merryChristmasState } from "../../state";
import { EVENT_CONFIG, PAGE_TYPE } from "constant";
import { Snowfall } from "../../components";
import instructionsGif from "assets/images/merry-christmas/instructions-gif.webp";
import instructionsFrame from "assets/images/merry-christmas/instructions-frame.webp";

interface InstructionsProps {}

const Wrapper = styled(motion.div)`
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

const BtnGift = styled(motion.button)`
  background: url(${giftImage}) no-repeat center / contain;
  aspect-ratio: 73/82;
  width: 6%;
`;

const InstructionsImg = styled(motion.img)``;

const BtnStart = styled(motion.button)`
  background: url(${btnStartImage}) no-repeat center / contain;
  aspect-ratio: 767/125;
  width: 55%;
`;

const InstructionsFrame = styled(motion.div)`
  background: url(${instructionsFrame}) no-repeat center / contain;
  overflow: hidden;
  aspect-ratio: 1092/536;
`;

export const Instructions: React.FC<InstructionsProps> = memo(() => {
  const navigate = useNavigateWithSearch();
  const [{ isGameLoading }, setMerryChristmas] =
    useRecoilState(merryChristmasState);
  useRegisterLoyaltyCustomer();

  // Hooks
  const { remainPlays, isLoading: remainPlaysLoading } = useRemainPlays();

  // Trackings
  useViewPage({
    pageType: PAGE_TYPE.INSTRUCTIONS,
    pageCate: EVENT_CONFIG.MERRY_CHRISTMAS,
  });

  // Effects
  useEffect(() => {
    // if (!remainPlaysLoading && !remainPlays) {
    //   setMerryChristmas((prev) => ({
    //     ...prev,
    //     currentScreen: SCREEN_KEYS.MAIN_MENU,
    //   }));
    // }
  }, [remainPlays, remainPlaysLoading]);

  // Handlers
  const onClickRedirectVoucherList = useCallback(() => {
    navigate("/gift", {
      newParams: {
        tab: "redeemed",
        voucherType: "voucher",
      },
    });
  }, [navigate]);

  const onStart = useCallback(() => {
    setMerryChristmas((prev) => ({
      ...prev,
      currentScreen: SCREEN_KEYS.PLAY_GAME,
      isGameLoading: false,
    }));
  }, [setMerryChristmas]);

  return (
    <>
      <Wrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Snowfall className="z-30" />
        <BtnGift
          className="absolute z-30 right-[4%] top-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ filter: "brightness(0.7)", y: 2 }}
          exit={{ opacity: 0 }}
          onClick={onClickRedirectVoucherList}
        />

        <div className="flex flex-col justify-end items-center w-full h-full z-20 mb-[8%]">
          <div className="relative h-[70%]">
            <InstructionsImg
              className="h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0 }}
              src={intrucstionsImage}
            />

            <InstructionsFrame
              className="absolute top-[31%] left-[51%] !-translate-x-1/2 w-[73%] z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
            />
            <motion.div
              className="absolute top-[31%] left-[51%] !-translate-x-1/2 w-[71%] rounded-[10px] overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
            >
              <motion.img src={instructionsGif} />
            </motion.div>
          </div>
          <BtnStart
            className="z-30"
            initial={{ y: "-50%", opacity: 0 }}
            animate={{ y: "-50%", opacity: 1, transition: { delay: 1 } }}
            exit={{ opacity: 0 }}
            whileTap={{ filter: "brightness(0.7)", y: 2 }}
            onClick={onStart}
          />
        </div>

        <div className="bottom-container absolute bottom-0 w-full h-1/4">
          <img src={bottomBackgroundImage} alt="" className="bottom-gift" />
        </div>
      </Wrapper>
    </>
  );
});

Instructions.displayName = "Instructions";
