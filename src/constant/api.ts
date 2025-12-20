export const ZMA_ERROR_CODE = {
  ACTION_LIMIT: -203,
} as const;

export const API_ERROR_CODE = {
  PROMOTION_NOT_AVAILABLE: 312,
  NOT_ENOUGH_POINTS: 313,
  LOYALTY_CUSTOMER_NOT_FOUND: 999,
  PROMOTION_NOT_FOUND: 315,
  DUPLICATE_REDEMPTION: 316,
  BAD_REQUEST: 400,
};

type ZMA_ERROR_CODE = (typeof ZMA_ERROR_CODE)[keyof typeof ZMA_ERROR_CODE];

export const ZMA_ERROR: Partial<
  Record<
    ZMA_ERROR_CODE,
    {
      code: ZMA_ERROR_CODE;
      message: string;
    }
  >
> = {
  [ZMA_ERROR_CODE.ACTION_LIMIT]: {
    code: ZMA_ERROR_CODE.ACTION_LIMIT,
    message:
      "Bạn đã gửi quá nhiều yêu cầu trong thời gian ngắn. Vui lòng khởi động lại ứng dụng và thử lại nhé!",
  },
};

export const API_ERROR = {
  [API_ERROR_CODE.NOT_ENOUGH_POINTS]: {
    code: API_ERROR_CODE.NOT_ENOUGH_POINTS,
    message:
      "Số điểm Quý Khách muốn quy đổi hiện đang vượt quá số điểm tích lũy hiện tại. Vui lòng kiểm tra lại số điểm hiện có hoặc quy đổi voucher nhỏ hơn.",
  },
  [API_ERROR_CODE.LOYALTY_CUSTOMER_NOT_FOUND]: {
    code: API_ERROR_CODE.LOYALTY_CUSTOMER_NOT_FOUND,
    message:
      "Không tìm thấy thông tin thành viên Aristino Rewards. Vui lòng kiểm tra lại số điện thoại đăng nhập hoặc liên hệ bộ phận CSKH của Aristino để được hỗ trợ.",
  },
  [API_ERROR_CODE.PROMOTION_NOT_FOUND]: {
    code: API_ERROR_CODE.PROMOTION_NOT_FOUND,
    message:
      "Voucher hiện đã hết số lượng quy đổi, vui lòng đổi sang Voucher khác.",
  },
  [API_ERROR_CODE.PROMOTION_NOT_AVAILABLE]: {
    code: API_ERROR_CODE.PROMOTION_NOT_AVAILABLE,
    message: "Ưu đãi này hiện không khả dụng. Vui lòng thử lại sau nhé!",
  },
  [API_ERROR_CODE.DUPLICATE_REDEMPTION]: {
    code: API_ERROR_CODE.DUPLICATE_REDEMPTION,
    message:
      "Úi Bạn đã đổi ưu đãi này rồi, mỗi khách hàng chỉ có thể đổi 1 lượt trong ưu đãi hot này thui bạn nha.",
  },
};
