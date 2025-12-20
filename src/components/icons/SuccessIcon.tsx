// Libraries
import React from "react";

// Hooks
import { useIconProps } from "./hooks/useIconProps";

// Types
import { IconProps } from "./types";

export const SuccessIcon: React.FC<IconProps> = (props) => {
  const iconProps = useIconProps(props);

  return (
    <svg
      viewBox="0 0 47 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...iconProps}
    >
      <rect
        x="2.25391"
        y="1.5"
        width="43"
        height="43"
        rx="21.5"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M19.2539 29.3281L35.1445 13.3672L37.2539 15.4766L19.2539 33.4766L10.8867 25.1094L12.9258 23L19.2539 29.3281Z"
        fill="#595959"
      />
      <path
        d="M19.2539 29.3281L35.1445 13.3672L37.2539 15.4766L19.2539 33.4766L10.8867 25.1094L12.9258 23L19.2539 29.3281Z"
        fill="white"
      />
      <path
        d="M19.2539 29.3281L35.1445 13.3672L37.2539 15.4766L19.2539 33.4766L10.8867 25.1094L12.9258 23L19.2539 29.3281Z"
        fill="currentColor"
      />
    </svg>
  );
};
