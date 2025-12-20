// Libraries
import React from "react";

interface DeliveryInfoIconProps extends React.SVGProps<SVGSVGElement> { }

export const DeliveryInfoIcon: React.FC<DeliveryInfoIconProps> = (props) => {
    return (
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_1360_9573"  maskUnits="userSpaceOnUse" x="0" y="0" width="19" height="18">
                <rect x="0.5" width="18" height="18" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_1360_9573)">
                <path d="M7.25 9.75H8.75V7.6875H10.25V9.75H11.75V6.1875L9.5 4.6875L7.25 6.1875V9.75ZM9.5 14.5125C11.025 13.1125 12.1562 11.8406 12.8938 10.6969C13.6313 9.55312 14 8.5375 14 7.65C14 6.2875 13.5656 5.17188 12.6969 4.30312C11.8281 3.43438 10.7625 3 9.5 3C8.2375 3 7.17188 3.43438 6.30312 4.30312C5.43438 5.17188 5 6.2875 5 7.65C5 8.5375 5.36875 9.55312 6.10625 10.6969C6.84375 11.8406 7.975 13.1125 9.5 14.5125ZM9.5 16.5C7.4875 14.7875 5.98438 13.1969 4.99063 11.7281C3.99688 10.2594 3.5 8.9 3.5 7.65C3.5 5.775 4.10312 4.28125 5.30938 3.16875C6.51563 2.05625 7.9125 1.5 9.5 1.5C11.0875 1.5 12.4844 2.05625 13.6906 3.16875C14.8969 4.28125 15.5 5.775 15.5 7.65C15.5 8.9 15.0031 10.2594 14.0094 11.7281C13.0156 13.1969 11.5125 14.7875 9.5 16.5Z" fill="#1C1B1F" fill-opacity="0.75" />
            </g>
        </svg>


    );
};