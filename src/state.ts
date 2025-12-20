// Libraries
import { atom, selector } from "recoil";
import { Authentication } from "schemas";
import { getUserInfo } from "zmp-sdk";

type AuthenticationState = Partial<Authentication>;

export const displayNameState = atom({
  key: "displayName",
  default: "",
});

export const luckyMoneyState = atom({
  key: "luckyMoney",
  default: {
    isFullLoading: true,
  },
});

export const loyaltyState = atom({
  key: "loyalty",
  default: {
    schemeFilter: {
      point: "all",
    },
    isOpenSummerGamePopup: true,
  },
});

export const authenticationState = atom<AuthenticationState>({
  key: "authentication",
  default: {},
});

export const locationState = atom({
  key: "location",
  default: {
    location: {
      province: "",
      ward: "",
    },
  },
});

export const userState = selector({
  key: "user",
  get: () =>
    getUserInfo({
      avatarType: "normal",
    }),
});