import { parsePhoneNumberFromString } from "libphonenumber-js";
import { GENDER_KEY } from "constant";

interface MaskPhoneOptions {
  /**
   * Number of digits to keep at the beginning of the phone number.
   * @default 3
   */
  keepStart?: number;

  /**
   * Number of digits to keep at the end of the phone number.
   * @default 3
   */
  keepEnd?: number;

  /**
   * Character used to mask the hidden part of the phone number.
   * @default '*'
   */
  maskChar?: string;
}

/**
 * Formats a Vietnamese phone number by ensuring it starts with a "0".
 * If the phone number starts with "+84" or "84", it replaces the prefix with "0".
 * Otherwise, it returns the phone number as is.
 *
 * @param phoneNumber - The phone number to format.
 * @returns The formatted phone number starting with "0".
 */
export function formatVietnamesePhoneNumber(phoneNumber: string): string {
  const prefix = phoneNumber.startsWith("+84")
    ? "+84"
    : phoneNumber.startsWith("84")
    ? "84"
    : "";
  return prefix ? "0" + phoneNumber.slice(prefix.length) : phoneNumber;
}

/**
 * Formats a Vietnamese phone number by converting the leading "0"
 * to "84" (or keeps as-is if already in correct format).
 *
 * @param phoneNumber - The phone number to format.
 * @returns The formatted phone number starting with "84".
 */
export function formatPhoneNumberTo84(phoneNumber: string): string {
  if (phoneNumber.startsWith("+84")) {
    return phoneNumber.replace("+84", "84");
  }

  if (phoneNumber.startsWith("0")) {
    return "84" + phoneNumber.slice(1);
  }

  return phoneNumber;
}

/**
 * Formats a number as a Vietnamese currency with the specified currency symbol.
 *
 * @param {number} amount - The amount to format.
 * @param {string} symbol - The currency symbol to use.
 * @returns {string} The formatted currency string with the currency symbol.
 *
 * @example
 * formatVietnameseCurrency(1234, 'VND') // "1.234 VND"
 */
export function formatVietnameseCurrency(
  amount: number,
  symbol: string = ""
): string {
  return new Intl.NumberFormat("vi-VN").format(amount) + symbol;
}

/**
 * Formats the gender value for events.
 *
 * @param gender - The gender string to format
 * @returns The formatted gender string in lowercase. Returns "other" if gender is UNKNOWN.
 *
 * @example
 * formatEventGender('MALE') // returns "male"
 * formatEventGender('FEMALE') // returns "female"
 * formatEventGender(GENDER_KEY.UNKNOWN) // returns "other"
 * formatEventGender('') // returns ""
 */
export function formatEventGender(gender: string): string {
  if ([GENDER_KEY.UNKNOWN].includes(gender)) {
    return "other";
  }

  return `${gender || ""}`.toLowerCase();
}

/**
 * Formats a number into a 2-digit string (e.g. 1 → "01", 9 → "09").
 *
 * @param num - The number to format.
 * @returns A string with at least two digits.
 *
 * @example
 * padToTwoDigits(1);  // "01"
 * padToTwoDigits(9);  // "09"
 * padToTwoDigits(10); // "10"
 */
export function padToTwoDigits(num: number): string {
  return num.toString().padStart(2, "0");
}

/**
 * Masks the middle part of a Vietnamese phone number while keeping the start and end visible.
 *
 * @param phoneNumber - The phone number to be masked (string or number).
 * @param options - Optional configuration:
 *   - `keepStart`: number of characters to keep at the beginning (default: 3),
 *   - `keepEnd`: number of characters to keep at the end (default: 3),
 *   - `maskChar`: the character used to mask (default: '*').
 *
 * @returns A masked phone number with only the specified parts visible.
 *
 * @throws Will throw an error if the phone number is too short to apply masking with the given configuration.
 *
 * @example
 * maskPhoneNumber('0901234567'); // returns '090****567'
 * maskPhoneNumber('0901234567', { keepStart: 4, keepEnd: 2 }); // returns '0901***67'
 * maskPhoneNumber('0901234567', { maskChar: '#' }); // returns '090####567'
 */
export function maskPhoneNumber(
  phoneNumber: string | number,
  options: MaskPhoneOptions = {}
): string {
  const phone = phoneNumber.toString().replace(/\D/g, "");
  const keepStart = options.keepStart ?? 3;
  const keepEnd = options.keepEnd ?? 3;
  const maskChar = options.maskChar ?? "*";

  if (phone.length <= keepStart + keepEnd) {
    return phone;
  }

  const start = phone.slice(0, keepStart);
  const end = phone.slice(phone.length - keepEnd);
  const maskedLength = phone.length - keepStart - keepEnd;
  const masked = maskChar.repeat(maskedLength);

  return `${start}${masked}${end}`;
}

/**
 * Replaces placeholders in the format ((key)) within a template string
 * with corresponding values from a replacements object.
 *
 * @param template - The string containing one or more placeholders like ((userName)), ((voucher)), etc.
 * @param values - An object mapping keys to their replacement values.
 *
 * @example
 * replaceTemplatePlaceholders("Chào ((userName)), mã của bạn là ((voucher))", {
 *   userName: "Vĩ",
 *   voucher: "ABC123"
 * });
 * // "Chào Vĩ, mã của bạn là ABC123"
 *
 * @returns The final string with all placeholders replaced.
 */
export function replaceTemplatePlaceholders(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\(\((.*?)\)\)/g, (_, key: string) => {
    return key in values ? String(values[key]) : `((${key}))`;
  });
}

export function checkIsVieNamePhoneNumber(phone = "") {
  const phoneNumber = parsePhoneNumberFromString(phone, "VN");

  return phoneNumber?.isValid() && phoneNumber.country === "VN";
}
