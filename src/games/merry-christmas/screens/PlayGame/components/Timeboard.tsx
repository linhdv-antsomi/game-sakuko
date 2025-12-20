import { motion } from "motion/react";
import React, { memo } from "react";
import styled from "styled-components";

import timeBg from "assets/images/merry-christmas/game-time.webp";
import dayjs from "dayjs";

interface TimeboardProps {
  timeLeft: number;
  className?: string;
}

const Wrapper = styled(motion.div)`
  background: url(${timeBg}) no-repeat center center / contain;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* width: 22%; */
  height: 38px;
  aspect-ratio: 264/113;
  font-weight: 700;
  font-size: 15px;
  padding-right: 3%;
  padding-top: 1%;
`;

export const Timeboard: React.FC<TimeboardProps> = memo(({ timeLeft, className }) => {
  return <Wrapper className={className}>{dayjs(timeLeft * 1000).format("mm:ss")}</Wrapper>;
});

Timeboard.displayName = "Timeboard";
