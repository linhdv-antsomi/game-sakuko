import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "motion/react";

import countdownBg from "assets/images/merry-christmas/countdown-board.webp";
import oneBg from "assets/images/merry-christmas/countdown-one.webp";
import twoBg from "assets/images/merry-christmas/countdown-two.webp";
import threeBg from "assets/images/merry-christmas/countdown-three.webp";

interface CountdownPopupProps {
  count?: number;
  onComplete: () => void;
}

const PopupOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  gap: 24px;
  border-radius: 16px;

  .popup-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    background: #ffffff;
    border-radius: 10px;
    padding: 16px;
  }
`;

const CountdownWrapper = styled(motion.div)`
  background: url(${countdownBg}) no-repeat center / contain;
  aspect-ratio: 797/419;
  width: 68%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  position: relative;
  border-radius: 10px;
`;

const Title = styled(motion.h2)`
  color: var(--color-text-2);
  font-size: 14px;
  font-weight: 400;
  text-align: center;
`;

const CountdownNumber = styled(motion.div)`
  font-size: 40px;
  font-weight: 600;
  color: var(--color-primary);

  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin-bottom: 3%;
`;

const COUNT_MAP = {
  1: {
    image: oneBg,
  },
  2: {
    image: twoBg,
  },
  3: {
    image: threeBg,
  },
};

export const CountdownPopup: React.FC<CountdownPopupProps> = ({
  count: initialCount = 3,
  onComplete,
}) => {
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    if (count < 1) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <PopupOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CountdownWrapper>
        <AnimatePresence mode="wait">
          <CountdownNumber
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            {COUNT_MAP?.[count]?.image && <img className="h-full" src={COUNT_MAP?.[count]?.image} alt="countdown" />}
          </CountdownNumber>
        </AnimatePresence>
      </CountdownWrapper>
    </PopupOverlay>
  );
};
