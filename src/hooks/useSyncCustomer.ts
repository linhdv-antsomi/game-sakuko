// Libraries
import { useLocalStorage } from "usehooks-ts";
import isEqual from "fast-deep-equal";
import { MD5 } from "crypto-js";

// Hooks
import { useUserInfo } from "./useUserInfo";
import { useDeepCompareEffect } from "./useDeepCompareEffect";

// Constants
import { DATE_TIME_FORMAT, LOCAL_STORAGE_KEY } from "constant";

// Utils
import { callCdpEvent, formatEventDateTime, formatEventGender } from "utils";

export const useSyncCustomer = () => {
  const { loyaltyCustomer, userInfo } = useUserInfo();
  const [cachedLoyaltyCustomer, setCachedLoyaltyCustomer] = useLocalStorage(
    LOCAL_STORAGE_KEY.LOYALTY_CUSTOMER,
    {}
  );

  useDeepCompareEffect(() => {
    if (loyaltyCustomer && !isEqual(loyaltyCustomer, cachedLoyaltyCustomer)) {
      const {
        customerName,
        gender,
        membershipLevel,
        membershipCard,
        availablePoints,
        addressDetailInfo,
        favoriteDish,
        favoriteStore,
        dateExpire,
        createdAt,
        dateOfBirth,
        customerId: accountId
      } = loyaltyCustomer || {};

      const customerId = MD5(userInfo?.phoneNumber).toString();

      // Call cdp event sync customer
      callCdpEvent({
        ec: "customer",
        ea: "sync",
        uId: userInfo?.id,
        dims: {
          customers: {
            customer_id: customerId,
            zma_aristino_zalo_uid: userInfo?.id,
            id_by_oa: userInfo?.idByOA,
            zalo_name: userInfo?.name,
            name: userInfo?.name || customerName,
            phone: userInfo?.phoneNumber,
            gender: formatEventGender(gender),
            birthday:
              formatEventDateTime(dateOfBirth, "DD/MM/YYYY") ||
              dateOfBirth ||
              "",
            aristino_membership_level: membershipLevel,
            aristino_membership_card: membershipCard,
            aristino_available_points: availablePoints,
            address_city: addressDetailInfo?.state,
            address_district: addressDetailInfo?.district,
            address_ward: addressDetailInfo?.detail1,
            address_street: addressDetailInfo?.detail2,
            favorite_dish: favoriteDish || "",
            favorite_store: favoriteStore || "",
            expiry_date: formatEventDateTime(dateExpire, "DD/MM/YYYY"),
            loyalty_create_date: formatEventDateTime(createdAt, DATE_TIME_FORMAT.LOYALTY_RETURN_FORMAT),
            account_id: String(accountId || ""),
          },
        },
        data: {},
        delay: 1500,
      });

      // Set local storage
      setCachedLoyaltyCustomer(loyaltyCustomer);
    }
  }, [
    cachedLoyaltyCustomer,
    loyaltyCustomer,
    userInfo,
    setCachedLoyaltyCustomer,
  ]);
};
