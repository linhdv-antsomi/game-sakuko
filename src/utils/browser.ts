/**
 * Converts the search parameters of a URL into an object.
 *
 * @param {string} url - The URL containing search parameters. Defaults to an empty string.
 * @returns {Record<string, string>} An object where each key-value pair represents
 * a search parameter and its corresponding value.
 */

export const getSearchParamsAsObject = <T = Record<string, string>>(): T => {
  const searchParams = new URLSearchParams(window.location.search);
  const paramsObject = {};

  searchParams.forEach((value, key) => {
    paramsObject[key] = value;
  });

  return paramsObject as T;
};
