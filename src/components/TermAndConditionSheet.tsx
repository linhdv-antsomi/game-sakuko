// Libraries
import { CloseIcon } from "components/icons";
import React from "react";
import { CloseButton } from "styled";
import styled from "styled-components";
import { Sheet } from "zmp-ui";
import { SheetProps } from "zmp-ui/sheet";

interface TermAndConditionSheetProps extends SheetProps {
  showCloseButton?: boolean;
}

const StyledTermAndConditionSheet = styled(Sheet)`
  .zaui-sheet-content {
    background-color: var(--tc-color-background);
    overflow: visible;
    max-height: 70vh;
  }

  .zaui-sheet-content-header {
    padding: 10px 0px;
    height: fit-content;
    width: 100%;
    .zaui-sheet-content-title {
      color: '#040918';
      font-weight: 700;
      font-size: 16px !important;
      padding: 0 20px;
      line-height: 1.5;
    }
  }

  .tc-content {
    height: 70vh;
    overflow: auto;
    padding: 0px 20px 30px 20px;
    color: var(--tc-color-text);
    line-height: 20px;
    word-break: break-word;
    font-style: italic;
    font-size: 14px;

    .term-title {
      font-weight: 700;
      font-size: 20px;
      line-height: 30px;
      text-align: center;
      color: var(--tc-color-text);
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
      padding-inline-start: 20px !important;
    }

    ul {
      list-style: disc;
      padding-left: 0px;

      ul {
        list-style: circle;
        /* padding-left: 20px; */

        ul {
          list-style: square;
          /* padding-left: 40px; */
        }
      }
    }

    ol {
      list-style-type: decimal;
      padding-inline-start: 20px !important;

      li {
        &::marker {
          font-weight: bold;
        }
      }
    }
  }

  .close-button {
    position: absolute;
    right: 5px;
    top: 23px;
  }
` as unknown as React.ComponentType<SheetProps>;

export const TermAndConditionSheet: React.FC<TermAndConditionSheetProps> = ({
  showCloseButton = true,
  children,
  onClose,
  ...props
}) => {
  return (
    <StyledTermAndConditionSheet {...props} onClose={onClose}>
      {showCloseButton && (
        <CloseButton className="close-button" onClick={onClose}>
          <CloseIcon style={{color:'#000000'}} />
        </CloseButton>
      )}
      {React.cloneElement(children as React.ReactElement, {
        className: "tc-content",
      })}
    </StyledTermAndConditionSheet>
  );
};
