// Libraries
import React from "react";

interface LuckyMoneyIconProps extends React.SVGProps<SVGSVGElement> {}

export const LuckyMoneyIcon: React.FC<LuckyMoneyIconProps> = (props) => {
  const { ...restProps } = props;

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="6"
        y="2.5"
        width="12"
        height="19"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
      />
      <mask id="path-2-inside-1_2044_3971" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 6.03635V1.5H19V5.90068C17.3381 7.62145 14.7898 8.72259 11.9329 8.72259C9.15181 8.72259 6.66316 7.67912 5 6.03635Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 6.03635V1.5H19V5.90068C17.3381 7.62145 14.7898 8.72259 11.9329 8.72259C9.15181 8.72259 6.66316 7.67912 5 6.03635Z"
        fill="white"
      />
      <path
        d="M5 6.03635H3V6.87201L3.59454 7.45926L5 6.03635ZM5 1.5V-0.5H3V1.5H5ZM19 1.5H21V-0.5H19V1.5ZM19 5.90068L20.4386 7.29006L21 6.70878V5.90068H19ZM7 6.03635V1.5H3V6.03635H7ZM5 3.5H19V-0.5H5V3.5ZM17 1.5V5.90068H21V1.5H17ZM17.5614 4.51131C16.3041 5.8131 14.2886 6.72259 11.9329 6.72259V10.7226C15.2911 10.7226 18.3721 9.4298 20.4386 7.29006L17.5614 4.51131ZM11.9329 6.72259C9.64087 6.72259 7.6687 5.86118 6.40546 4.61344L3.59454 7.45926C5.65763 9.49705 8.66275 10.7226 11.9329 10.7226V6.72259Z"
        fill="currentColor"
        mask="url(#path-2-inside-1_2044_3971)"
      />
      <circle
        cx="12.001"
        cy="8.34668"
        r="1.625"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};
