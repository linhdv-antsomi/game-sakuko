import React from "react";
import styled from "styled-components";
import { Button } from "zmp-ui";

interface ControlsProps {
  fallingCount: number;
  timeLeft: number;
  isGameOver: boolean;
  onRestart: () => void;
}

interface ControlsWrapperProps {
  $isGameOver: boolean;
}

const ControlsWrapper = styled.div<ControlsWrapperProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: var(--game-width);
  justify-content: space-between;
  flex-wrap: wrap;

  .stats {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    background: rgba(255, 255, 255, 0.98);
    padding: 6px 12px;
    border-radius: 999px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }

  .stat-label {
    color: var(--color-text-tertiary);
    font-size: 0.8rem;
  }

  .stat-value {
    font-weight: 700;
    color: var(--color-primary);
  }

  .time-left {
    min-width: 80px;
  }

  .restart-button {
    opacity: ${(props) => (props.$isGameOver ? "1" : "0.5")};
    pointer-events: ${(props) => (props.$isGameOver ? "auto" : "none")};
  }

  @media (max-width: 520px) {
    .stats {
      gap: 8px;
    }

    .stat {
      font-size: 0.85rem;
      padding: 5px 10px;
    }

    .stat-label {
      font-size: 0.75rem;
    }
  }
`;

export const Controls: React.FC<ControlsProps> = React.memo(
  ({ fallingCount, timeLeft, isGameOver, onRestart }) => {
    return (
      <ControlsWrapper $isGameOver={isGameOver}>
        <div className="stats">
          <div className="stat time-left">
            <span className="stat-label">Thời gian:</span>
            <span className="stat-value">{timeLeft}s</span>
          </div>
          <div className="stat">
            <span className="stat-label">Đã rơi:</span>
            <span className="stat-value">{fallingCount}</span>
          </div>
        </div>
        {/* <Button
          size="small"
          onClick={onRestart}
          className="restart-button"
          disabled={!isGameOver}
        >
          {isGameOver ? "Chơi lại" : "Đang chơi..."}
        </Button> */}
      </ControlsWrapper>
    );
  }
);

Controls.displayName = "Controls";
