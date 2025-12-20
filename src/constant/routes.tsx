import React from "react";
// import { UserDrips } from "components";

type Route = {
  key: string;
  path: string;
  name: string;
  title: string;
  showBackButton: boolean;
  hideSafeArea?: boolean;
  navRightExtra?: React.ReactNode;
  // Optional category for the page, used for tracking cdp events
  pageCate?: string;
  hideBoxShadow? : boolean;
};

export const ROUTE_KEYS = {
  GIFT_FORM: "GIFT_FORM",
  TRANSACTION_HISTORY: "TRANSACTION_HISTORY",
  ACCUMULATE_POINTS: "ACCUMULATE_POINTS",
  GIFT: "GIFT",
  GIFT_DETAIL: "GIFT-DETAIL",
  ACCOUNT: "ACCOUNT",
  UPDATE_ACCOUNT: "UPDATE_ACCOUNT",
  VOUCHER_DETAIL: "VOUCHER-DETAIL",
  HOME: "HOME",
  SURVEY_ORDER: "SURVEY_ORDER",
  STORE_LOCATION: "STORE_LOCATION",
  GAME_CARD_FLIP: "GAME_CARD_FLIP",
  GAME_CHRISTMAS: "GAME_CHRISTMAS",
} as const;

type RouteKey = (typeof ROUTE_KEYS)[keyof typeof ROUTE_KEYS];

export const ROUTES: Record<RouteKey, Route> = {
  [ROUTE_KEYS.HOME]: {
    key: ROUTE_KEYS.HOME,
    path: "/",
    name: "home",
    title: "Trang Chủ",
    showBackButton: false,
  },
  [ROUTE_KEYS.GIFT_FORM]: {
    key: ROUTE_KEYS.GIFT_FORM,
    path: "/gift-form",
    name: "gift-form",
    title: "Điền thông tin để nhận quà",
    showBackButton: true,
  },
  [ROUTE_KEYS.TRANSACTION_HISTORY]: {
    key: ROUTE_KEYS.TRANSACTION_HISTORY,
    path: "/transaction-history",
    name: "transaction-history",
    title: "Lịch sử giao dịch",
    showBackButton: true,
    hideBoxShadow: true,
    pageCate: "history_transaction",
    // navRightExtra: <UserDrips />,
  },
  [ROUTE_KEYS.ACCUMULATE_POINTS]: {
    key: ROUTE_KEYS.ACCUMULATE_POINTS,
    path: "/accumulate-points",
    name: "accumulate-points",
    title: "Tích điểm",
    showBackButton: true,
    pageCate: "qr_earn_point",
  },
  [ROUTE_KEYS.GIFT]: {
    key: ROUTE_KEYS.GIFT,
    path: "/gift",
    name: "gift",
    title: "Quà Tặng",
    showBackButton: true,
    // navRightExtra: <UserDrips />,
    pageCate: "list_scheme",
  },
  [ROUTE_KEYS.GIFT_DETAIL]: {
    key: ROUTE_KEYS.GIFT_DETAIL,
    path: "/gift/:giftId",
    name: "gift-detail",
    title: "Quà Tặng",
    showBackButton: true,
    // navRightExtra: <UserDrips  />,
    pageCate: "gift_detail",
  },
  [ROUTE_KEYS.ACCOUNT]: {
    key: ROUTE_KEYS.ACCOUNT,
    path: "/account",
    name: "account",
    title: "Tài khoản",
    showBackButton: true,
    pageCate: "my_account",
    // navRightExtra: <UserDrips />,
  },
  [ROUTE_KEYS.UPDATE_ACCOUNT]: {
    key: ROUTE_KEYS.UPDATE_ACCOUNT,
    path: "/account/update-account",
    name: "update-account",
    title: "Cập nhật tài khoản",
    showBackButton: true,
    hideBoxShadow: true,
    // navRightExtra: <UserDrips />,
  },
  [ROUTE_KEYS.VOUCHER_DETAIL]: {
    key: ROUTE_KEYS.VOUCHER_DETAIL,
    path: "/vouchers/:voucherId",
    name: "voucher-detail",
    title: "Quà tặng",
    showBackButton: true,
    pageCate: "edit_account",
    // navRightExtra: <UserDrips />,
  },
  [ROUTE_KEYS.SURVEY_ORDER]: {
    key: ROUTE_KEYS.SURVEY_ORDER,
    path: "/survey-order",
    name: "survey-order",
    title: "Khảo sát",
    showBackButton: true,
  },
  [ROUTE_KEYS.STORE_LOCATION]: {
    key: ROUTE_KEYS.STORE_LOCATION,
    path: '/ecommerce/store-location',
    name: "store-location",
    title: 'Vị trí cửa hàng',
    showBackButton: true,
  },
  [ROUTE_KEYS.GAME_CARD_FLIP]: {
    key: ROUTE_KEYS.GAME_CARD_FLIP,
    path: '/games/card-flip',
    name: "game-card-flip",
    title: 'Lật thẻ đan lát',
    showBackButton: false,
  },
  [ROUTE_KEYS.GAME_CHRISTMAS]: {
    key: ROUTE_KEYS.GAME_CHRISTMAS,
    path: '/games/merry-christmas',
    name: "game-merry-christmas",
    title: 'Vui Giáng Sinh - Ring Quà Tặng',
    showBackButton: false,
  },
};
