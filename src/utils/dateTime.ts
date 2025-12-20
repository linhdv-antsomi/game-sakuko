// Libraries
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/vi";

dayjs.extend(customParseFormat); // Bắt buộc phải extend plugin này
dayjs.extend(relativeTime);
dayjs.locale("vi");

export { dayjs };

// Constants
import { DATE_TIME_FORMAT } from "constant";

/**
 * Formats a given date string into a predefined voucher date format.
 * If the date is invalid, it returns an empty string.
 *
 * @param {string} date - The date in ISO format to be formatted.
 * @returns {string} - The formatted date string or an empty string if the date is invalid.
 */

export const formatVoucherDateTime = (date: string): string => {
  const isValidDate = dayjs(date).isValid();

  if (isValidDate) {
    return dayjs(date).format(DATE_TIME_FORMAT.VOUCHER_DATE_FORMAT);
  }

  return "";
};

export const formatVoucherDate = (date: string): string => {
  const isValidDate = dayjs(date).isValid();

  if (isValidDate) {
    return dayjs(date).format(DATE_TIME_FORMAT.VOUCHER_DATE);
  }

  return "";
};
export const formatEventDateTime = (date?: string, format?: string): string => {
  const isValidDate = dayjs(date, format).isValid();

  if (isValidDate) {
    return dayjs(date, format).format(DATE_TIME_FORMAT.EVENT_DATE_FORMAT);
  }

  return "";
};

/**
 * Returns a string representing the time difference between the given date and now.
 * If the given date is invalid, it returns an empty string.
 * @param {string} date the date in ISO format
 * @returns {string} a string representing the time difference between the given date and now
 */
export const countdownDateExpiration = (
  date: string,
  format?: string
): string => {
  const isValidDate = dayjs(date, format).isValid();

  if (isValidDate) {
    return dayjs(date, format).fromNow();
  } else {
    return "";
  }
};

/**
 * Checks if the given date is in the past.
 * @param {string} date the date in ISO format
 * @returns {boolean} true if the date is in the past, false if it is in the future
 */
export const isExpired = (date: string): boolean => {
  const now = new Date();
  const expiryDate = new Date(date);
  return now > expiryDate;
};

/**
 * Checks if the given last action date is within the given number of days threshold.
 * If so, it will return false. If not, it will execute the callback function and return true.
 * @param {{ daysThreshold: number, lastDateStr: string, callback: Function }} options
 * @param {number} options.daysThreshold number of days threshold
 * @param {string} options.lastDateStr the date string in ISO format
 * @param {Function} options.callback the callback function to be executed
 * @returns {boolean} false if the given last action date is within the given number of days threshold, true otherwise
 */
export const checkLastActionDate = ({
  daysThreshold = 1,
  lastDateStr = "",
  callback = () => {},
}): boolean => {
  const currentDate = dayjs();

  if (lastDateStr) {
    const lastDate = dayjs(lastDateStr);

    const diffInDays = currentDate.diff(lastDate, "day");

    if (diffInDays < daysThreshold) return false;
  }

  callback();
  return true;
};

/**
 * Check if the current date is within the given date range.
 * @param {string} startDate - The start date of the range (format: YYYY-MM-DD).
 * @param {string} endDate - The end date of the range (format: YYYY-MM-DD).
 * @returns {boolean} - True if the current date is within the range, false otherwise.
 */
export function isTodayInRange(startDate: string, endDate: string): boolean {
  const today = dayjs();
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  return (
    (today.isAfter(start, "day") && today.isBefore(end, "day")) ||
    today.isSame(start, "day") ||
    today.isSame(end, "day")
  );
}

export const formatAllocatedVoucherDate = (date: string | Date): string => {
  const isValidDate = dayjs(date).isValid();

  if (isValidDate) {
    return dayjs(date).format(DATE_TIME_FORMAT.VOUCHER_ALLOCATED_DATE_FORMAT);
  }

  return "";
};
