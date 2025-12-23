import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "motion/react";

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
  background-color: #D9D9D966;

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
  background: #f05a92;
  border-radius: 15px;
  box-shadow: 0px 4px 4px 0px #d97b9640, 0px 0px 6px 2px #ffffff66 inset;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 18px 0px;
  gap: 10px;
`;

const Title = styled(motion.h2)`
  color: #ffffff;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  height: 21px;
`;

const CountdownNumber = styled(motion.div)`
  font-size: 58px;
  font-weight: 600;
  color: #ffff2c;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  /* margin-bottom: 3%; */
`;

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
        <Title>Chuẩn bị</Title>
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
            {count}
          </CountdownNumber>
        </AnimatePresence>
      </CountdownWrapper>
    </PopupOverlay>
  );
};
