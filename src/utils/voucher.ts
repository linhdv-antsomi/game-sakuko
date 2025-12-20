// Schemas
import { Voucher } from "schemas";

// Utils
import { isExpired } from "./dateTime";

/**
 * Checks if the given voucher is available.
 * A voucher is considered available if it's status is "available" and the expiry date is in the future.
 *
 * @param {Voucher} voucher - The voucher to check.
 * @returns {boolean} true if the voucher is available, false otherwise.
 */
export const checkAvailableVoucher = (voucher?: Voucher): boolean => {
  const { status, expiryDate } = voucher || {};

  if (isExpired(expiryDate || "")) return false;

  return status === "available";
};
