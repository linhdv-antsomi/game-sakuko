// Libraries
import styled, { css } from "styled-components";

// Assets
import { Sheet } from "zmp-ui";

export const CountdownExpiry = styled.div<{ $isUsed?: boolean }>`
  display: flex;
  align-items: center;
  height: 17px;
  font-size: 12px;
  color: #9d6e26;
  border-radius: 999px;
  padding: 0px 5px;
  background-color: #fff6c5;

  ${({ $isUsed }) =>
    $isUsed &&
    css`
      color: #378a44;
      background-color: #cbf8d2;
    `}
`;

export const CloseButton = styled.button`
  width: 46px;
  height: 46px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
`;

export const TermAndConditionSheet = styled(Sheet)`
  .zaui-sheet-content {
    background-color: #feeeeb;
    overflow: visible;
  }

  .zaui-sheet-content-header {
    padding: 40px 0px;

    .zaui-sheet-content-title {
      color: var(--color-primary);
      font-weight: 700;
      font-size: 24px !important;
    }
  }

  .tc-content {
    height: 70vh;
    overflow: auto;
    padding: 0px 20px 30px 30px;
    color: var(--color-main-primary);
    line-height: 24px;

    .term-title {
      font-weight: 700;
      font-size: 24px;
      line-height: 30px;
      text-align: center;
      color: var(--color-primary);
    }

    .term-divider {
      border-bottom: 1px dashed #dbcac7;
      margin: 10px 0px;
      line-height: 0;
    }

    .prize-box {
      border: 1px solid #dbcac7;
      border-radius: 10px;
      padding: 15px;
      margin-bottom: 10px;

      ul {
        padding-left: 20px;
      }
    }

    ul {
      list-style-type: disc;
    }

    ul {
      list-style: disc;
      padding-left: 0px;

      ul {
        list-style: circle;
        padding-left: 20px;

        ul {
          list-style: square;
          padding-left: 40px;
        }
      }
    }

    ol {
      list-style-type: decimal;

      li {
        &::marker {
          font-weight: bold;
        }
      }
    }
  }

  .close-button {
    position: absolute;
    /* top: -20px; */
    right: 5px;
  }
`;
