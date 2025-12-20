// Libraries
import React, { ReactNode } from "react";
import styled from "styled-components";
import clsx from "clsx";

// Types
import Modal, { ModalProps } from "zmp-ui/modal";

// Icons
import { CloseIcon } from "components/icons";
import { Button } from "zmp-ui";

// Types
import { ButtonProps } from "zmp-ui/button";

interface SystemNotificationModalProps extends Omit<ModalProps, "description"> {
  description?: ReactNode;
  showCloseButton?: boolean;
  retryButtonProps?: ButtonProps;
  showRetryButton?: boolean;
}

const StyledModal = styled(Modal)`
  .zaui-modal-content {
    overflow: visible;
  }

  .zaui-modal-content-main {
    padding: 30px 24px;
    text-align: center;

    > .zaui-modal-content-title {
      /* color: var(--color-primary); */
      font-weight: 700;
      font-size: 20px;
    }

    > .zaui-modal-content-description {
      text-align: center;
    }

    > .zaui-modal-description {
      text-align: center;
      /* color: var(--color-main-primary); */
      font-size: 15px;
      /* font-weight: 700; */
      line-height: 24px;
      max-height: 500px;
      overflow: auto;
    }

    > .close-button {
      position: absolute;
      width: 46px;
      aspect-ratio: 1;
      background-color: var(--color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      color: #ffffff;
      transform: translateX(25%) translateY(-25%);
      right: 0px;
      top: 0cqb;
      cursor: pointer;
    }
  }
`;

export const SystemNotificationModal: React.FC<SystemNotificationModalProps> = (
  props
) => {
  const {
    visible,
    children,
    description,
    showCloseButton = false,
    retryButtonProps,
    showRetryButton = true,
    onClose,
    ...restProps
  } = props;
  const { children: retryChildren = "Thử lại", ...restOfRetryButtonProps } =
    retryButtonProps || {};

  return (
    <>
      <StyledModal {...restProps} visible={visible} onClose={onClose}>
        {showCloseButton && (
          <div className="close-button">
            <CloseIcon onClick={onClose} />
          </div>
        )}
        <div className="zaui-modal-description">{description}</div>
        <div className={clsx("flex items-center justify-center gap-5", {
          "mt-5": showRetryButton
        })}>
          {showRetryButton && (
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                window.location.reload();
              }}
              {...restOfRetryButtonProps}
            >
              {retryChildren}
            </Button>
          )}
        </div>
        {children}
      </StyledModal>
    </>
  );
};
