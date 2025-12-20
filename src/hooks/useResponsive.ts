// Libraries
import { useMediaQuery } from "usehooks-ts";

// Constants
import { BREAKPOINTS } from "constant";

export const useResponsive = () => {
  return {
    isLargeMobile: useMediaQuery(`(min-width: ${BREAKPOINTS.xs}px)`),
    isSmallMobile: useMediaQuery(`(min-width: ${BREAKPOINTS.xxs}px)`),
  };
};
