import React from "react";
import styled from "styled-components";

// Assets
import giftBoxImage from "assets/images/merry-christmas/gift-box.webp";
import gameBg from "assets/images/merry-christmas/background-2.webp";
import gameBgBottom from "assets/images/merry-christmas/game-bottom.webp";
import { GameSnowfall } from "games/merry-christmas/components";

interface GameAreaProps {
  gameRef: React.RefObject<HTMLDivElement>;
  boxRef: React.RefObject<HTMLDivElement>;
}

const GameAreaWrapper = styled.div`
  --size: 17%;

  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: url(${gameBg}) bottom center / cover no-repeat;
  overflow: hidden;
  touch-action: none; /* Prevent all touch gestures for better performance */
  user-select: none;

  .falling-item {
    position: absolute;
    /* Position will be controlled via transform, not top/left */
    top: 0;
    left: 0;
    width: var(--size);
    height: var(--size);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: calc(var(--size) * 0.72);
    /* Removed drop-shadow - causes heavy repaints on mobile */
    pointer-events: none;
    backface-visibility: hidden; /* GPU acceleration */
    will-change: transform; /* Items are constantly moving */
  }

  #box {
    position: absolute;
    bottom: 10vh;
    width: var(--box-width);
    height: var(--box-height);
    /* Removed left property - using transform for movement */
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    /* GPU acceleration for smooth movement */
    transform: translateZ(0);
    backface-visibility: hidden;
    will-change: transform; /* Only on box since it moves constantly */
    z-index: 100;
  }

  .box-graphic {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* Removed drop-shadow - major cause of lag when moving box */
  }
`;

export const GameArea: React.FC<GameAreaProps> = React.memo(
  ({ gameRef, boxRef }) => {
    return (
      <GameAreaWrapper ref={gameRef}>
        <GameSnowfall id="snowfall" className="absolute top-0 left-0 w-full h-full z-[1]" />

        <div id="box" ref={boxRef}>
          <div className="box-graphic">
            <img src={giftBoxImage} alt="Gift Box" className="box-image" />
          </div>
        </div>

        <div className="bg-bottom absolute bottom-0 w-full z-0">
          <img src={gameBgBottom} alt="" />
        </div>
      </GameAreaWrapper>
    );
  }
);

GameArea.displayName = "GameArea";
