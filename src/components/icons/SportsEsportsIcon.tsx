// Libraries
import React from "react";

// Hooks
import { useIconProps } from "./hooks/useIconProps";

// Types
import { IconProps } from "./types";

export const SportsEsportsIcon: React.FC<IconProps> = (props) => {
  const iconProps = useIconProps(props);

  return (
    <svg
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...iconProps}
    >
      <g clipPath="url(#clip0_2194_2490)">
        <path
          d="M16.6807 3.12891C17.1336 3.12891 17.5012 3.49647 17.5012 3.94937V5.39092L15.8603 7.03184V4.76983H4.37383V11.4156L7.65567 8.13372L11.2066 11.6855L10.0457 12.8448L7.65567 10.4556L4.37383 13.7366V16.2563H13.0157L13.5966 16.2571L14.687 15.1659L15.7782 16.2563H15.8603V13.9934L17.5012 12.3525V17.0767C17.5012 17.5296 17.1336 17.8972 16.6807 17.8972H3.55337C3.10212 17.8972 2.73291 17.528 2.73291 17.0767V3.94937C2.73291 3.49647 3.10048 3.12891 3.55337 3.12891H16.6807ZM18.1395 7.07368L19.2996 8.23381L12.9181 14.6154L11.7563 14.6137L11.758 13.4552L18.1395 7.07368V7.07368ZM12.9887 6.41075C13.668 6.41075 14.2194 6.9621 14.2194 7.64144C14.2194 8.32078 13.668 8.87213 12.9887 8.87213C12.3093 8.87213 11.758 8.32078 11.758 7.64144C11.758 6.9621 12.3093 6.41075 12.9887 6.41075Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_2194_2490">
          <rect
            width="19.6911"
            height="19.6911"
            fill="white"
            transform="translate(0.271484 0.667969)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
