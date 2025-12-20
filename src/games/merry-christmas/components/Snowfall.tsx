import React, { memo } from "react";
import styled from "styled-components";
import snowImg from "assets/images/merry-christmas/snow.webp";

interface SnowfallProps {
  count?: number; // số bông tuyết
  className?: string;
}

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FallWrapper = styled.div<{
  duration: number;
  delay: number;
  left: number;
}>`
  position: absolute;
  top: -50px;
  left: ${(p) => p.left}%;
  animation: fall ${(p) => p.duration}s linear infinite;
  animation-delay:  ${(p) => p.delay}s;

  @keyframes fall {
    0% {
      transform: translateY(-50px);
    }
    100% {
      transform: translateY(110vh);
    }
  }
`;

const SwayWrapper = styled.div<{ sway: number }>`
  animation: sway ${(p) => p.sway}s ease-in-out infinite alternate;

  @keyframes sway {
    0% {
      transform: translateX(-10px);
    }
    100% {
      transform: translateX(10px);
    }
  }
`;

const Spin = styled.img<{ size: number; spin: number }>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  animation: tilt ${(p) => p.spin}s ease-in-out infinite alternate;

  @keyframes tilt {
    0% {
      transform: rotate(-7deg);
    }
    100% {
      transform: rotate(7deg);
    }
  }
`;

export const Snowfall: React.FC<SnowfallProps> = memo(
  ({ count = 8, className }) => {
    const flakes = Array.from({ length: count }).map((_, i) => {
      const size = 36; // 236px
      const duration = Math.random() * 2 + 8; // 8 – 10s rơi
      const delay = i + 2; // delay ngẫu nhiên
      const sway = Math.random() * 3 + 2; // 2 – 5s lắc
      const spin = Math.random() * 2 + 1; // 1 – 3s xoay
      const CENTER_WIDTH = 70; // né 40% giữa
      const sideWidth = (100 - CENTER_WIDTH) / 2; // = 30%

      const left = i % 2 === 0 ? Math.random() * sideWidth : 100 - sideWidth + Math.random() * (sideWidth - 10);
        // Math.random() < 0.5
        //   ? Math.random() * sideWidth // 0 → 30
        //   : 100 - sideWidth + Math.random() * (sideWidth - 5); // 70 → 100

      return { size, duration, delay, sway, spin, left, id: i };
    });

    return (
      <Wrapper className={className}>
        {flakes.map((f) => (
          <FallWrapper
            key={f.id}
            duration={f.duration}
            delay={f.delay}
            left={f.left}
          >
            <SwayWrapper sway={f.sway}>
              <Spin src={snowImg} size={f.size} spin={f.spin} alt="flake" />
            </SwayWrapper>
          </FallWrapper>
        ))}
      </Wrapper>
    );
  }
);

Snowfall.displayName = "Snowfall";
