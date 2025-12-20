// Constants
import { BREAKPOINTS } from "constant/breakpoints";

/**
 * Create a media query
 * @function respond
 * @param {Breakpoints} size - Breakpoint
 * @param {(TemplateStringsArray | string)} styles - Styles to apply
 * @returns {string} - Media query
 */
export const respond = Object.fromEntries(
  Object.entries(BREAKPOINTS).map(([key, size]) => [
    key,
    (styles: TemplateStringsArray | string) => `
      @media (min-width: ${size}px) {
        ${styles}
      }
    `,
  ])
);
