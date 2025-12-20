// Libraries
import React from "react";

// Hooks
import { useIconProps } from "./hooks/useIconProps";

// Types
import { IconProps } from "./types";

export const LightningIcon: React.FC<IconProps> = ({
  width = 12,
  height = 18,
  ...props
}) => {
  const iconProps = useIconProps({
    ...props,
    width,
    height,
  });

  return (
    <svg
      viewBox="0 0 12 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...iconProps}
    >
      <path
        d="M11.5809 5.76037C11.4546 5.53167 11.2086 5.38882 10.9408 5.38882H7.54906L8.73625 1.36011C8.79865 1.14759 8.75511 0.919594 8.61796 0.742965C8.48081 0.566335 8.26601 0.462891 8.03816 0.462891H2.95849C2.63121 0.462891 2.34458 0.675409 2.25822 0.98152L0.0812229 8.72226C0.0217183 8.93408 0.0674353 9.16067 0.204586 9.33448C0.342463 9.5083 0.555083 9.61104 0.781491 9.61104H4.26614L2.9701 16.5221C2.90842 16.85 3.09274 17.1751 3.41203 17.3004C3.50129 17.3356 3.59345 17.3518 3.68416 17.3518C3.92145 17.3518 4.15076 17.2392 4.28864 17.0386L11.5453 6.48308C11.6933 6.26704 11.7071 5.98978 11.5809 5.76037Z"
        fill="currentColor"
      />
    </svg>
  );
};
