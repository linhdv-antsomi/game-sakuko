// Libraries
import React from "react";

// Hooks
import { useIconProps } from "./hooks/useIconProps";

// Types
import { IconProps } from "./types";

export const LunchDiningIcon: React.FC<IconProps> = (props) => {
  const iconProps = useIconProps(props);

  return (
    <svg
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...iconProps}
    >
      <path
        d="M17.5012 2.36523V18.7744H15.8603V13.0312H12.5784V7.288C12.5784 5.9824 13.0971 4.73028 14.0203 3.80708C14.9435 2.88388 16.1956 2.36523 17.5012 2.36523V2.36523ZM15.8603 4.441C15.1793 4.82662 14.2194 5.78655 14.2194 7.288V11.3903H15.8603V4.441V4.441ZM7.65567 12.1287V18.7744H6.01475V12.1287C5.0883 11.9393 4.25568 11.4357 3.65769 10.7032C3.0597 9.97065 2.73303 9.05408 2.73291 8.10846V3.18569H4.37383V8.92892H6.01475V3.18569H7.65567V8.92892H9.29659V3.18569H10.9375V8.10846C10.9374 9.05408 10.6107 9.97065 10.0127 10.7032C9.41475 11.4357 8.58213 11.9393 7.65567 12.1287V12.1287Z"
        fill="currentColor"
      />
    </svg>
  );
};
