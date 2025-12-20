export const VOUCHER_STATUS_KEY = {
  AVAILABLE: "available",
  USED: "used",
  EXPIRED: "expired",
  CANCELLED: "cancelled",
} as const;

export const VOUCHER_STATUS_OPTIONS = [
  {
    value: VOUCHER_STATUS_KEY.AVAILABLE,
    label: "Chưa sử dụng",
  },
  {
    value: VOUCHER_STATUS_KEY.USED,
    label: "Đã sử dụng",
  },
];

export const VOUCHER_TYPE_KEY = {
  REDEEM: "redeem",
  VOUCHER: "voucher",
} as const;

export const VOUCHER_TYPE_OPTIONS = [
  {
    value: VOUCHER_TYPE_KEY.REDEEM,
    label: "Đổi điểm",
  },
  {
    value: VOUCHER_TYPE_KEY.VOUCHER,
    label: "Được tặng",
  },
];
