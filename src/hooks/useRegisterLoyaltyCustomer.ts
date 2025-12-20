// Libraries
import { MD5 } from "crypto-js";

// Hooks
import { useDeepCompareEffect } from "./useDeepCompareEffect";
import { useUserInfo } from "./useUserInfo";

// Utils
import { callCdpEvent, dayjs, formatEventDateTime } from "utils";

// Queries
// import { useCreateLoyaltyCustomer } from "queries";
import {DATE_TIME_FORMAT} from "constant";

export const useRegisterLoyaltyCustomer = () => {
  const { userInfo, isRegistered } = useUserInfo();
  // Queries
  // const { mutateAsync: createLoyaltyCustomer } = useCreateLoyaltyCustomer({});
  const createLoyaltyCustomer = () => {}

  // Handle call cdp event identify and register customer loyalty
  useDeepCompareEffect(() => {
    if (userInfo && userInfo?.phoneNumber && userInfo?.name) {
      const customerId = MD5(userInfo?.phoneNumber).toString();

      callCdpEvent({
        ec: "user",
        ea: "identify",
        uId: userInfo.id,
        dims: {
          users: {
            user_id: userInfo.id,
            identify_event: "allow_miniapp",
            identify_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            id_by_oa: userInfo.idByOA,
            name: userInfo.name,
            phone: userInfo.phoneNumber,
          },
          customers: {
            name: userInfo.name,
            zalo_name: userInfo.name,
            phone: userInfo.phoneNumber,
            customer_id: customerId,
            zma_aristino_zalo_uid: userInfo.id,
            id_by_oa: userInfo.idByOA,
          },
        },
        data: {
          identify_id: customerId,
          identify_event: "allow_miniapp",
        },
      });

      (async () => {
        if (!isRegistered) {
          const { data: loyaltyCustomer } = await createLoyaltyCustomer({
            data: {
              customerName: `${userInfo.name}`,
              phoneNumber: userInfo.phoneNumber,
            },
          });

          // Call Cdp event sign up
          callCdpEvent({
            uId: userInfo.id,
            ea: "sign_up",
            ec: "user",
            dims: {
              customers: {
                customer_id: customerId,
                name: userInfo?.name,
                phone: userInfo?.phoneNumber,
                ...(loyaltyCustomer?.createdAt && {
                  loyalty_create_date: formatEventDateTime(
                    loyaltyCustomer?.createdAt,
                    DATE_TIME_FORMAT.LOYALTY_RETURN_FORMAT
                  ),
                }),
              },
            },
            data: {
              customer_phone: userInfo?.phoneNumber,
              customer_name: userInfo?.name,
            },
          });
        }
      })();
    }
  }, [createLoyaltyCustomer, isRegistered, userInfo]);
};
