// Libraries
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { QUERY_KEY } from "constant";

// Schemas
import {
  AllocateVoucher,
  Countdown,
  HotNews,
  LoyaltyCustomer,
  Scheme,
} from "schemas";

// Services
import {
  CreateLoyaltyArgs,
  GetHotNewsListArgs,
  GetLoyaltyCustomerDetailArgs,
  GetSchemeDetailArgs,
  GetSchemeListArgs,
  GetTransactionListArgs,
  loyaltyServices,
  RedeemSchemeArgs,
  UpdateLoyaltyCustomerArgs,
} from "services";

// Types
import { CommonResponse, TransactionResponse } from "types";

export interface UseCreateLoyaltyCustomerProps {
  options?: UseMutationOptions<
    CommonResponse<LoyaltyCustomer>,
    Error,
    CreateLoyaltyArgs
  >;
}

export interface UseUpdateLoyaltyCustomerProps {
  options?: UseMutationOptions<
    CommonResponse<LoyaltyCustomer>,
    Error,
    UpdateLoyaltyCustomerArgs
  >;
}

export interface UseGetLoyaltyCustomerDetailProps {
  args: GetLoyaltyCustomerDetailArgs;
  options?: Partial<UseQueryOptions<CommonResponse<LoyaltyCustomer>, Error>>;
}

export interface UseGetTransactionListProps {
  args: GetTransactionListArgs;
  options?: Partial<
    UseInfiniteQueryOptions<
      CommonResponse<TransactionResponse>,
      Error,
      {
        pages: CommonResponse<TransactionResponse>[];
      },
      CommonResponse<TransactionResponse>,
      any,
      number
    >
  >;
}

export interface UseGetSchemeListProps {
  args: GetSchemeListArgs;
  options?: UseQueryOptions<
    CommonResponse<{
      countDown?: Countdown;
      schemes: Scheme[];
    }>,
    Error
  >;
}

export interface UseGetSchemeDetailProps {
  args: GetSchemeDetailArgs;
  options?: Partial<UseQueryOptions<CommonResponse<Scheme>, Error>>;
}

export interface UseRedeemSchemeProps {
  options?: UseMutationOptions<
    CommonResponse<AllocateVoucher>,
    Error,
    RedeemSchemeArgs
  >;
}

export interface UseGetHotNewsListProps {
  args?: GetHotNewsListArgs;
  options?: Partial<UseQueryOptions<CommonResponse<HotNews[]>, Error>>;
}

export const useCreateLoyaltyCustomer = ({
  options,
}: UseCreateLoyaltyCustomerProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loyaltyServices.createLoyaltyCustomer,
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY.GET_LOYALTY_CUSTOMER_DETAIL,
          {
            customerId: variables.data.phoneNumber,
          },
        ],
        exact: false,
      });
    },
    ...options,
  });
};

export const useGetLoyaltyCustomerDetail = ({
  args,
  options,
}: UseGetLoyaltyCustomerDetailProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_LOYALTY_CUSTOMER_DETAIL, args],
    queryFn: () => loyaltyServices.getLoyaltyCustomerDetail(args),
    ...options,
  });
};

export const useGetTransactionList = ({
  args,
  options,
}: UseGetTransactionListProps) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_TRANSACTION_LIST, args],
    queryFn: async ({ pageParam }) =>
      await loyaltyServices.getTransactionList({
        ...args,
        params: {
          ...args?.params,
          page: pageParam,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const { total } = lastPage?.data || {};

      // Check if the total number of items is defined
      if (total) {
        const currentTotalItems = allPages.flatMap(
          (page) => page?.data?.transactions
        );

        return (currentTotalItems?.length || 0) < +total
          ? allPages.length + 1
          : undefined;
      }

      return undefined;
    },
    ...options,
  });
};

export const useUpdateLoyaltyCustomer = ({
  options,
}: UseUpdateLoyaltyCustomerProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loyaltyServices.updateLoyaltyCustomer,
    onSettled(data, error, variables) {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_LOYALTY_CUSTOMER_DETAIL],
        exact: false,
      });
    },
    ...options,
  });
};

export const useGetSchemeList = ({ args, options }: UseGetSchemeListProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_SCHEME_LIST, args],
    queryFn: () => loyaltyServices.getSchemeList(args),
    ...options,
  });
};

export const useGetHotNewsList = ({
  args,
  options,
}: UseGetHotNewsListProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_HOT_NEWS_LIST],
    queryFn: () => loyaltyServices.getHowNewsList(),
    ...options,
  });
};

export const useGetSchemeDetail = ({
  args,
  options,
}: UseGetSchemeDetailProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_SCHEME_DETAIL, args],
    queryFn: () => loyaltyServices.getSchemeDetail(args),
    ...options,
  });
};

export const useRedeemScheme = ({ options }: UseRedeemSchemeProps) => {
  const { onSettled, ...restOptions } = options || {};
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loyaltyServices.redeemScheme,
    onSettled(...args) {
      /**
       * Invalidate the cached data for the customer detail and transaction list
       * after redeeming a scheme.
       */
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_LOYALTY_CUSTOMER_DETAIL],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_TRANSACTION_LIST],
        exact: false,
      });

      onSettled?.(...args);
    },
    ...restOptions,
  });
};
