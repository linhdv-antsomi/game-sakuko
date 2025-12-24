import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "motion/react";

import {
  useAppConfig,
  useNavigateWithSearch,
  useRegisterLoyaltyCustomer,
  useViewPage,
} from "hooks";
import { useRemainPlays } from "../../hooks";
import { SCREEN_KEYS } from "../../constants";
import { useRecoilState } from "recoil";
import { merryChristmasState } from "../../state";
import { EVENT_CONFIG, PAGE_TYPE } from "constant";
import { Image } from "@antscorp/ama-ui";

// Assets
import bgImg from "assets/images/catch-rewards/background-2.webp";
import instructionImg from "assets/images/catch-rewards/instruction.webp";
import itemBgImg from "assets/images/catch-rewards/bg-2.webp";
import { CollectionItem } from "schemas";
import { COLLECTTIONS } from "../PlayGame/constants";
import { ButtonBox } from "../MainMenu";

interface InstructionsProps {}

const Wrapper = styled(motion.div)`
  background: url(${bgImg}) no-repeat top center;
  background-size: cover;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const InstructionsWrapper = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px #d97b9640, 0px 0px 1px 1px #d2d2d233 inset;
  padding: 30px 22px;
  margin-bottom: 6vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 88%;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: clamp(20px, 6vw, 28px);
  line-height: 22px;
  color: #ed5691;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0px;
  margin-bottom: 2vh;
`;
const Text = styled.div`
  font-weight: 600;
  font-size: clamp(12px, 3.6vw, 16px);
  line-height: 18px;
  text-align: justify;
  letter-spacing: 0px;
  color: #243771;
`;
const TextRed = styled.div`
  font-weight: 500;
  font-size: clamp(10px, 3vw, 14px);
  line-height: 16px;
  text-align: justify;
  color: #de001e;
`;
const ItemsWrapper = styled.div`
  background: url(${itemBgImg}) no-repeat center / contain;
  display: grid;
  /* flex-wrap: wrap; */
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 23px 15px;
  width: 100%;
  margin-top: 12px;
  margin-bottom: 20px;
`;

const Item = styled.div<{ $type: CollectionItem["type"] }>`
  background: ${({ $type }) =>
    $type === "plus-time"
      ? "#E3FFEB"
      : $type === "stun"
      ? "#FDFFC8"
      : $type === "minus-score"
      ? "#FFC8C9"
      : "#ffffff"};
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px #d97b9640, 0px 0px 1px 1px #d2d2d233 inset;
  padding: 6px;
  aspect-ratio: 1/1;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .img {
    max-height: 70%;
  }
  .label {
    max-height: 27%;
    font-weight: 600;
    font-size: clamp(6px, 2vw, 10px);
    text-align: justify;
    color: ${({ $type }) =>
      $type === "plus-time"
        ? "#0AC000"
        : $type === "stun"
        ? "#A8B400"
        : $type === "minus-score"
        ? "#FF2D31"
        : "#0AC000"};
  }
`;
const BtnPlay = styled(ButtonBox)`
  width: 60vw;
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

export const Instructions: React.FC<InstructionsProps> = memo(() => {
  const navigate = useNavigateWithSearch();
  const [{ isGameLoading }, setMerryChristmas] =
    useRecoilState(merryChristmasState);
  useRegisterLoyaltyCustomer();
  const { appSettings } = useAppConfig();

  const collectionItems: CollectionItem[] =
    appSettings?.games?.catchRewards?.collectionItems ||
    (COLLECTTIONS as CollectionItem[]);

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
        <InstructionsWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.6 } }}
        >
          <Title>Cách thức tham gia</Title>
          <Text>
            1. Điều khiển giỏ hàng sang trái/phải để hứng vật phẩm may mắn.
          </Text>
          <Image
            src={instructionImg}
            style={{
              marginBottom: "2vh",
            }}
          />
          <Text>2. Hứng càng nhiều trúng càng cao, giải thường càng lớn.</Text>
          <TextRed>
            Lưu ý: Tránh "Boom" để không bị trừ điểm, tránh "đá tảng" để không
            bị "choáng", hứng đồng hồ sẽ nhận thêm thời gian chơi!
          </TextRed>
          <ItemsWrapper>
            {collectionItems?.map((item) => {
              const label =
                item.type === "stun"
                  ? "Choáng"
                  : item.type === "minus-score"
                  ? `-${item.value} điểm`
                  : `+${item.value}${
                      item.type === "plus-time" ? "s" : " điểm"
                    }`;
              return (
                <Item key={item.id} $type={item.type}>
                  <img className="img" src={item.itemImage} />
                  <div className="label">{label}</div>
                </Item>
              );
            })}
          </ItemsWrapper>
          <BtnPlay
            initial={{ opacity: 0 }}
            animate={{
              opacity: [1, 0.9, 1],
              filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            exit={{ opacity: 0 }}
            whileTap={{ filter: "brightness(0.7)", y: 2, scale: 1 }}
            onClick={onStart}
          >
            Bắt đầu ngay
          </BtnPlay>
        </InstructionsWrapper>
      </Wrapper>
    </>
  );
});

Instructions.displayName = "Instructions";
