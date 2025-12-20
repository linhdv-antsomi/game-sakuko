import React, { memo } from 'react';
import styled from 'styled-components';

interface ScoreTotalProps {
    total: number
}

const TotalWrapper = styled.div`
    background-color: #63040f96;
    color: #ffffff;
    padding: 3px 8px;
    /* width: fit-content; */
    font-weight: 700;
    border-radius: 6px;
`;

export const ScoreTotal: React.FC<ScoreTotalProps> = memo(({ total }) => {
  return (
    <TotalWrapper>SCORE: {total}</TotalWrapper>
  )
});

ScoreTotal.displayName = "ScoreTotal";
