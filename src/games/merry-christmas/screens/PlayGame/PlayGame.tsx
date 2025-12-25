import { APP_CONFIG, EVENT_CONFIG, PAGE_TYPE } from "constant";
import { useAppConfig, useSoundEffect, useUserInfo, useViewPage } from "hooks";
import { AnimatePresence, motion } from "motion/react";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { merryChristmasState } from "../../state";
import { Controls, CountdownPopup, GameArea } from "./components";
import { GAME_CONFIG, COLLECTTIONS } from "./constants";
import useGameEngine from "./hooks/useGameEngine";
import { Scores } from "./types";
import countDownSound from "assets/sound-effects/countdown.mp3";
import { CollectionItem } from "schemas";
import { SCREEN_KEYS } from "../../constants";
import { useRemainPlays } from "games/merry-christmas/hooks";
import { useGetCanPlay, useGetGameDetail } from "queries";

interface PlayGameProps {
  onGameOver: (scores: Scores, totalScore: number) => void;
}

const PlayGameWrapper = styled(motion.div)`
  --game-width: min(420px, 90vw);
  --game-height: 100vh;
  --box-width: 130px;
  --box-height: 67px;
  --item-size: 68px;

  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .overlay-ui {
    padding-top: var(--padding-top) !important;
    padding: 12px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
    flex-wrap: wrap;

    > * {
      pointer-events: auto;
    }
  }
`;

const ControlWrapper = styled(motion.div)`
  margin-top: 40px;
`;

export const PlayGame: React.FC<PlayGameProps> = memo(({ onGameOver }) => {
  const { userInfo } = useUserInfo();
  const gameRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [showCountdown, setShowCountdown] = useState<boolean>(true);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [state, setMerryChristmasState] = useRecoilState(merryChristmasState);
  const { play: playCountDown } = useSoundEffect(countDownSound, {
    volume: 1,
    html5: false,
  });
  const { data: canPlayData } = useGetCanPlay();
  const { data: gameDetailData } = useGetGameDetail();

  useViewPage({
    pageType: PAGE_TYPE.PLAY_GAME,
    pageCate: EVENT_CONFIG.CATCH_REWARDS,
  });

  // Get collectionItems from app settings
  const {
    collections = [],
    timeDelayShowResult = APP_CONFIG.GAMES.CATCH_REWARDS.TIME_DELAY_SHOW_GIFT,
    minScoreToClaimReward = APP_CONFIG.GAMES.CATCH_REWARDS
      .MIN_SCORE_TO_CLAIM_REWARD,
  } = gameDetailData?.data?.metadata || {};
  const collectionItems: CollectionItem[] =
    collections?.length > 0 ? collections : (COLLECTTIONS as CollectionItem[]);
  const { remainingTurns = 0 } = canPlayData?.data || {};

  const handleCountdownComplete = useCallback(() => {
    setShowCountdown(false);
    setGameStarted(true);
  }, []);

  /**
   * Handle game end - switch to results screen with top collection
   */
  const handleGameEnd = useCallback(
    (finalScores: Scores, totalScore: number) => {
      onGameOver(finalScores, totalScore);
      setMerryChristmasState((prev) => ({
        ...prev,
        isPlaying: false,
        showResultsScreen: true,
        scores: finalScores,
        totalScore,
      }));

      setTimeout(() => {
        setMerryChristmasState((prev) => ({
          ...prev,
          currentScreen:
            totalScore >= minScoreToClaimReward
              ? SCREEN_KEYS.RESULTS
              : SCREEN_KEYS.RESULT_FAILED,
        }));
      }, timeDelayShowResult);
    },
    [setMerryChristmasState]
  );

  const { scores, totalScore, timeLeft, isGameOver } = useGameEngine(
    gameRef,
    boxRef,
    {
      collections: collectionItems,
      startDelay: gameStarted ? 0 : GAME_CONFIG.COUNTDOWN_START * 1000, // 3 seconds delay for countdown (3-2-1)
    }
  );

  // Watch for game over and handle end
  const prevIsGameOverRef = useRef<boolean>(false);

  useEffect(() => {
    playCountDown();
  }, [playCountDown]);

  useEffect(() => {
    // Only trigger once when game transitions to over state
    if (isGameOver && !prevIsGameOverRef.current && timeLeft === 0) {
      prevIsGameOverRef.current = true;
      handleGameEnd(scores, totalScore);
    }
    // Reset ref when game restarts
    if (!isGameOver) {
      prevIsGameOverRef.current = false;
    }
  }, [isGameOver, timeLeft, scores, totalScore, handleGameEnd]);

  return (
    <PlayGameWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <GameArea gameRef={gameRef} boxRef={boxRef} />

      <ControlWrapper className="overlay-ui">
        <Controls
          timeLeft={timeLeft}
          scores={scores}
          collections={collectionItems || []}
          totalScore={totalScore}
          remainPlays={remainingTurns}
        />
      </ControlWrapper>

      <AnimatePresence>
        {showCountdown && (
          <CountdownPopup
            count={GAME_CONFIG.COUNTDOWN_START}
            onComplete={handleCountdownComplete}
          />
        )}
      </AnimatePresence>
    </PlayGameWrapper>
  );
});

PlayGame.displayName = "PlayGame";
