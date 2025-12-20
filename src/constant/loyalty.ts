// Constants
// import { DeliveryInfoIcon, HistoryOrderIcon, PrivacyPolicyIcon, ProgramRuleIcon } from "components";
import { APP_CONFIG } from "./appConfig";
import { icons } from "lucide-react";

export const FAVORITE_DISHES = [
  {
    key: "1",
    value: "1",
    label: "Phin Sữa Đá",
  },
  {
    key: "2",
    value: "2",
    label: "Phin Đen Đá",
  },
  {
    key: "3",
    value: "3",
    label: "Bạc Xỉu",
  },
  {
    key: "4",
    value: "4",
    label: "Latte",
  },
  {
    key: "5",
    value: "5",
    label: "Caramel Macchiato",
  },
  {
    key: "6",
    value: "6",
    label: "Trà Sen Vàng",
  },
  {
    key: "7",
    value: "7",
    label: "Trà Thạch Vải",
  },
  {
    key: "8",
    value: "8",
    label: "Freeze Trà Xanh",
  },
  {
    key: "9",
    value: "9",
    label: "Cookies & Cream",
  },
  {
    key: "10",
    value: "10",
    label: "Bánh Mousse Cacao",
  },
];

export const FAVORITE_STORES = [
  // {
  //   key: "1",
  //   value: "1",
  //   label:
  //     "Highlands Coffee Friendship Tower D1 - 31 Lê Duẩn, Phường Bến Nghé, Quận 1, TP.HCM",
  // },
  // {
  //   key: "2",
  //   value: "2",
  //   label:
  //     "Highlands Coffee AB Tower HCM - 76A Lê Lai, Phường Bến Thành, Quận 1, TP.HCM",
  // },
  // {
  //   key: "3",
  //   value: "3",
  //   label:
  //     "Highlands Coffee 71 Lý Tự Trọng - 71 Lý Tự Trọng, Phường Bến Thành, Quận 1, TP.HCM",
  // },
  // {
  //   key: "4",
  //   value: "4",
  //   label:
  //     "Highlands Coffee Nguyễn Bỉnh Khiêm - 29/1 Nguyễn Bỉnh Khiêm, Phường Đa Kao, Quận 1, TP.HCM",
  // },
  // {
  //   key: "5",
  //   value: "5",
  //   label:
  //     "Highlands Coffee 46 Bùi Thị Xuân - 46 – 48 Bùi Thị Xuân, Phường Bến Thành, Quận 1, TP.HCM",
  // },
  // {
  //   key: "6",
  //   value: "6",
  //   label:
  //     "Highlands Coffee 166 Nguyễn Công Trứ - 166 Nguyễn Công Trứ, Phường Nguyễn Thái Bình, Quận 1, TP.HCM",
  // },
  // {
  //   key: "7",
  //   value: "7",
  //   label:
  //     "Highlands Coffee Vinhomes Ba Son - SH02, AQUA 4, KDC Vinhomes Ba Son, Phường Bến Nghé, Quận 1, TP.HCM",
  // },
  // {
  //   key: "8",
  //   value: "8",
  //   label:
  //     "Highlands Coffee 119 Hàm Nghi - 119 Hàm Nghi, Phường Nguyễn Thái Bình, Quận 1, TP.HCM",
  // },
  // {
  //   key: "9",
  //   value: "9",
  //   label:
  //     "Highlands Coffee Dinh Độc Lập 2 - Bên trong Dinh Độc Lập, 135 Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1, TP.HCM",
  // },
  // {
  //   key: "10",
  //   value: "10",
  //   label:
  //     "Highlands Coffee 210 Nguyễn Trãi HCM - 210 Nguyễn Trãi, Phường Phạm Ngũ Lão, Quận 1, TP.HCM",
  // },
];

export const TRANSACTION_TYPE_KEY = {
  EARN: "earnings",
  BURN: "redeem",
} as const;

export const PARTNERS = {
  ARISTINO: {
    key: "aristino",
    name: "Aristino",
  },
};

export const PRIVACY_POLICY = {
  key: "privacy-policy",
  label: "Chính sách bảo mật",
  contentTitle: "Chính sách bảo mật",
  contentDefault: APP_CONFIG.PRIVACY_POLICY,
  // icon: PrivacyPolicyIcon
};

export const PROGRAM_RULES = {
  key: "program-rules",
  label: "Thể lệ chương trình",
  contentTitle:
    "Thể lệ chương trình",
  contentDefault: APP_CONFIG.PROGRAM_RULES,
  // icon: ProgramRuleIcon
};
export const HISTORY_ORDER = {
  key: "history-order",
  label: "Lịch sử giao hàng",
  // contentTitle: "Chính sách bảo mật",
  contentDefault: APP_CONFIG.HISTORY_ORDER,
  // icon: HistoryOrderIcon
};

export const INFO_DELIVERY = {
  key: "info-delivery",
  label: "Thông tin giao hàng",
  // contentTitle:
  //   "Điều khoản và điều kiện của chương trình thành viên Aristino Rewards",
  contentDefault: APP_CONFIG.INFO_DELIVERY,
  // icon: DeliveryInfoIcon
};