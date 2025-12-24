import React from "react";
import styled from "styled-components";
import { createItemTypesFromCollections } from "../constants";
import { Scores } from "../types";
import { CollectionItem } from "schemas";

import { ScoreTotal } from "./ScoreTotal";

interface ScoreboardProps {
  scores: Scores;
  totalScore: number;
  collections: CollectionItem[];
  className?: string;
}

const ScoreboardWrapper = styled.div`
  aspect-ratio: 753/108;
  /* width: 64%; */
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: space-between;
  /* border-radius: 10px;
  padding: 15px 10px; */
  padding: 0 8px;
  height: 35px;

  .score-item {
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    border-radius: 12px;
    /* gap: 2px; */
  }

  .icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .info {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
    min-width: 0;
    width: 14px;
  }

  .value {
    font-weight: 600;
  }
`;

export const Scoreboard: React.FC<ScoreboardProps> = React.memo(
  ({ scores, totalScore, collections, className }) => {
    const itemTypes = createItemTypesFromCollections(collections);

    return (
      <div className="flex flex-col items-end gap-1">
        <ScoreboardWrapper className={className}>
          {itemTypes.map((item) => (
            <div key={item.key} className="score-item">
              {item.image ? (
                <img
                  src={item.scoreImage || item.image}
                  alt={item.label}
                  className="icon shrink-0"
                  style={{
                    width: "15px",
                    height: "15px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span className="icon">{item.emoji || "⭐"}</span>
              )}
              <div className="info">
                <span className="value">{scores[item.key] || 0}</span>
              </div>
            </div>
          ))}
        </ScoreboardWrapper>
          <ScoreTotal total={totalScore} />
      </div>
    );
  }
);

Scoreboard.displayName = "Scoreboard";
