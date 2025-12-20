export const isDevelopment = () => {
  return process.env.NODE_ENV === "development";
};

/**
 * Function to remove accent
 * @param str - String want to remove accent
 * @returns {string} - Result after remove accent
 */
export const removeAccent = (str: string) => {
  str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a");
  str = str.replace(/[èéẹẻẽêềếệểễ]/g, "e");
  str = str.replace(/[ìíịỉĩ]/g, "i");
  str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o");
  str = str.replace(/[ùúụủũưừứựửữ]/g, "u");
  str = str.replace(/[ỳýỵỷỹ]/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, "A");
  str = str.replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, "E");
  str = str.replace(/[ÌÍỊỈĨ]/g, "I");
  str = str.replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
};

/** Remove all accents and convert string to lower case, remove leading and trailing white space */
export const simplifyString = (str: string) =>
  removeAccent(`${str || ""}`.toLowerCase().trim()) || "";

/**
 * @param str target string
 * @param queryStr search query
 * @returns true if target string includes search query
 */
export const searchStringQuery = (str: string, queryStr: string) =>
  simplifyString(str).includes(simplifyString(queryStr || ""));

/**
 * Checks if any of the provided values match the search value.
 *
 * @param {string[]} values - The values to search through.
 * @param {string} searchValue - The value to search for.
 * @returns {boolean} True if any value matches the search value, otherwise false.
 */
export const searchMatchAny = (
  values: string[],
  searchValue: string
): boolean => values.some((value) => searchStringQuery(value, searchValue));

/**
 * Recursively searches through a list of items and their children to find matches based on specified search keys and a search value.
 *
 * @template T - The type of items in the list.
 * @param {Object} params - The parameters for the search.
 * @param {T[]} [params.list=[]] - The list of items to search through.
 * @param {keyof T} [params.childrenKey='children'] - The key used to access children of each item.
 * @param {Array<keyof T>} params.searchKeys - The keys of the item properties to search against.
 * @param {string} params.searchValue - The value to search for in the specified keys.
 * @returns {Object} The search results.
 * @returns {T[]} returns.results - The list of items that match the search criteria.
 * @returns {T[]} returns.matchedParents - The list of parent items that have matching children.
 */
export const recursiveSearchItems = <T = any>({
  list = [],
  childrenKey = "children" as keyof T,
  searchKeys,
  searchValue,
}: {
  list: T[];
  searchValue: string;
  searchKeys: (keyof T)[];
  childrenKey?: keyof T;
}): { results: T[]; matchedParents: T[] } => {
  const results: T[] = [];
  const matchedParents: T[] = [];

  function matchesSearchValue(item: T) {
    return searchMatchAny(
      searchKeys.map((key) => item[key as string] || ""),
      searchValue
    );
  }

  function searchChildren(children: T[], parent: T): T[] {
    const matchingChildren: T[] = [];

    children.forEach((child) => {
      const childMatches = matchesSearchValue(child);
      let matchingSubChildren: T[] = [];

      if (child[childrenKey] && Array.isArray(child[childrenKey])) {
        matchingSubChildren = searchChildren(child[childrenKey] as T[], child);
      }

      if (childMatches || matchingSubChildren.length > 0) {
        matchingChildren.push({
          ...child,
          ...(matchingSubChildren.length > 0 && {
            [childrenKey]: matchingSubChildren,
          }),
        });
      }
    });

    if (matchingChildren.length > 0) {
      matchedParents.push(parent);
    }

    return matchingChildren;
  }

  list.forEach((item) => {
    if (matchesSearchValue(item)) {
      /**
       * If the item has children and the search value is not empty, add it to the matched parents for expands.
       */
      if (
        item[childrenKey] &&
        Array.isArray(item[childrenKey]) &&
        (item[childrenKey] as T[]).length > 0 &&
        !!searchValue
      ) {
        matchedParents.push(item);
      }

      results.push(item);
    } else if (item[childrenKey] && Array.isArray(item[childrenKey])) {
      const matchingChildren = searchChildren(item[childrenKey] as T[], item);
      if (matchingChildren.length > 0) {
        results.push({ ...item, [childrenKey]: matchingChildren });
      }
    }
  });

  return {
    results,
    matchedParents,
  };
};

/**
 * Safely parse a string to an integer.
 * If the string is not a number (NaN), or if there is an error during parsing, return 0.
 * @param {string} value The string to be parsed
 * @returns {number} The parsed integer, or 0 if parsing fails
 */
export const safeParseInt = (value: string): number => {
  try {
    // Check is not NaN
    if (isNaN(parseInt(value, 10))) {
      return 0;
    }

    return parseInt(value, 10);
  } catch (error) {
    return 0;
  }
};

/**
 * Returns a random item from an array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} list - The array to select a random item from.
 * @returns {T | undefined} A random item from the array, or undefined if the array is empty.
 */
export const getRandomItem = <T>(list: T[]): T | undefined => {
  if (!list || list.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};

/**
 * Safely parse a JSON string.
 * If the string is not valid JSON, or if there is an error during parsing, return null.
 * @param {string} value The JSON string to be parsed
 * @returns {T | null} The parsed object, or null if parsing fails
 */
export const safeParseJson = <T = any>(value: string): T | null => {
  try {
    return JSON.parse(value);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
};

export const formatNumber = number => +number ? Number(number).toLocaleString('en-US') : "0";