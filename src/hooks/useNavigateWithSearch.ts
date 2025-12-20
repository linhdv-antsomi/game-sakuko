import {
  useNavigate,
  useLocation,
  NavigateFunction,
  To,
} from "react-router-dom";

/**
 * Options to configure the behavior of the `useNavigateWithSearch` hook.
 */
interface NavigateWithSearchOptions {
  /**
   * Determines whether to keep the existing search params.
   * @default true
   */
  keepExistingParams?: boolean;
  /**
   * New search params to add or override.
   */
  newParams?: Record<string, string>;
}

/**
 * Return type of the `useNavigateWithSearch` hook.
 * A custom navigation function that supports retaining or manipulating search params.
 */
type NavigateWithSearch = (to: To, options?: NavigateWithSearchOptions) => void;

/**
 * Custom hook for navigation with the ability to retain or manipulate search params.
 * Inherits all capabilities of `useNavigate` from React Router DOM.
 *
 * @returns {NavigateWithSearch} A custom navigation function.
 *
 * @example
 * ```tsx
 * const navigateWithSearch = useNavigateWithSearch();
 *
 * // Navigate while keeping existing search params
 * navigateWithSearch('/new-page');
 *
 * // Navigate with new params, keeping old ones
 * navigateWithSearch('/new-page', {
 *   newParams: { id: '123' },
 * });
 *
 * // Navigate without keeping old params
 * navigateWithSearch('/new-page', {
 *   keepExistingParams: false,
 *   newParams: { key: 'value' },
 * });
 * ```
 */
export function useNavigateWithSearch(): NavigateWithSearch {
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();

  /**
   * Custom navigation function.
   *
   * @param {To} to - The destination path or object to navigate to.
   * @param {NavigateWithSearchOptions} [options] - Options to handle search params.
   */
  const navigateWithSearch: NavigateWithSearch = (
    to: To,
    options: NavigateWithSearchOptions = {}
  ) => {
    const { keepExistingParams = true, newParams } = options;

    // Get current search params from the URL
    const currentSearchParams = new URLSearchParams(location.search);
    const nextSearchParams = new URLSearchParams();

    // If keeping existing params, copy them to the new object
    if (keepExistingParams) {
      currentSearchParams.forEach((value, key) => {
        nextSearchParams.set(key, value);
      });
    }

    // Add or override with new params
    if (newParams) {
      Object.entries(newParams).forEach(([key, value]) => {
        nextSearchParams.set(key, value);
      });
    }

    // Build the navigation object
    const navigateTo =
      typeof to === "string"
        ? {
            pathname: to,
            search: nextSearchParams.toString(),
          }
        : {
            ...to,
            search: nextSearchParams.toString(),
          };

    // Call the original navigate function
    navigate(navigateTo);
  };

  return navigateWithSearch;
}
