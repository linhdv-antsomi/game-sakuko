// Apis
import { getAccessToken, getPhoneNumber } from "zmp-sdk/apis";

// Services
import { zaloServices } from "services";

// Utils
import { formatVietnamesePhoneNumber } from "./format";

export const getUserPhoneNumber = async () => {
  const { data } = (await zaloServices.getZaloInfo()) || {};
  const formatPhoneNumber = formatVietnamesePhoneNumber(data?.number || "");

  return formatPhoneNumber;
};
