import dayjs from "dayjs";
import React from "react";
import { CollectionItem } from "schemas";
import styled from "styled-components";
import { Button } from "zmp-ui";
import { Scores } from "../types";
import { Divider } from "@antscorp/ama-ui";
import { motion } from "motion/react";

import iconPlayImg from "assets/images/catch-rewards/icon-play.webp";

interface ControlsProps {
  timeLeft: number;
  scores: Scores;
  totalScore: number;
  collections: CollectionItem[];
  remainPlays: number;
  className?: string;
}

interface ControlsWrapperProps {
  $isGameOver: boolean;
}

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  padding: 8px 12px;
  background: #ffffff;
  box-shadow: 0px 3px 4px 0px #d97b9640, 0px 0px 1px 1px #d2d2d233 inset;

  .timer {
    font-weight: 600;
    font-size: 18px;
    color: #243771;
    width: 55px;
  }

  .divider {
    width: 2px;
    height: 30px;
    background: #2d447f;
  }

  .items {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 14px;
    padding-left: 18px;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }
  .item-icon {
    height: 24px;
  }
  .item-info {
    color: #243771;
    font-weight: 500;
    font-size: 15px;
    width: 16px;
    text-align: right;
  }
`;

const ScoreWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .remain-play {
    background: #ffffff;
    border-radius: 6px;
    box-shadow: 0px 3px 4px 0px #d97b9640, 0px 0px 1px 1px #d2d2d233 inset;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 12px;
    color: #243771;
    font-weight: 500;
    font-size: 15px;
  }

  .total-score {
    color: #ffffff;
    background: #ed5691;
    border-radius: 6px;
    padding: 4px 10px;
    font-size: 15px;
    font-weight: 500;
    box-shadow: 0px 3px 4px 0px #d97b964d, 0px 0px 1px 1px #d2d2d233 inset;
  }
`;

export const Controls: React.FC<ControlsProps> = React.memo(
  ({ timeLeft, collections, scores, remainPlays, totalScore, className }) => {
    return (
      <Wrapper>
        <ControlsWrapper>
          <div className="timer">
            {dayjs((timeLeft || 0) * 1000).format("mm:ss")}
          </div>
          <div className="divider" />
          <div className="items">
            {collections
              ?.filter((collection) => collection.type === "plus-score")
              ?.map((collection) => (
                <div className="item" key={collection.id}>
                  <img
                    className="item-icon"
                    src={collection.scoreImage || collection.itemImage}
                    alt={collection.title}
                  />
                  <div className="item-info">
                    <span className="value">{scores[collection.id] || 0}</span>
                  </div>
                </div>
              ))}
          </div>
        </ControlsWrapper>
        <ScoreWrapper>
          <div className="remain-play">
            Lượt chơi: {remainPlays}{" "}
            <img
              src={iconPlayImg}
              style={{
                width: 18,
                marginLeft: 3,
              }}
            />
          </div>
          <div className="total-score">Điểm số: {totalScore}</div>
        </ScoreWrapper>
      </Wrapper>
    );
  }
);

Controls.displayName = "Controls";
