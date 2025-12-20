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

// Constants
import { QUERY_KEY } from "constant";

// Schemas
import {
  AllocateVoucher,
  AppSettings,
  CheckCanAllocateVoucher,
  Voucher,
} from "schemas";

// Services
import {
  AllocateVoucherAFFParams,
  AllocateVoucherParams,
  CheckCanAllocateVoucherParams,
  GetVoucherDetailParams,
  voucherServices,
} from "services";

// Types
import { CommonResponse, GetListParams, GetListResponse } from "types";

interface UseGetVoucherListProps {
  params?: GetListParams;
  options?: Partial<
    UseInfiniteQueryOptions<
      GetListResponse<Voucher>,
      Error,
      { pages: GetListResponse<Voucher>[] },
      GetListResponse<Voucher>,
      any,
      number
    >
  >;
}

interface UseAllocateVoucherProps {
  options?: UseMutationOptions<
    CommonResponse<AllocateVoucher>,
    Error,
    AllocateVoucherParams,
    any
  >;
}

interface UseAllocateVoucherAFFProps {
  options?: UseMutationOptions<
    CommonResponse<AllocateVoucher>,
    Error,
    AllocateVoucherAFFParams,
    any
  >;
}

interface UseGetVoucherDetailProps {
  params: GetVoucherDetailParams;
  options?: Omit<
    UseQueryOptions<
      CommonResponse<Voucher>,
      Error,
      CommonResponse<Voucher>,
      any
    >,
    "queryKey"
  >;
}

interface UseCheckCanAllocateVoucherProps {
  options?: UseMutationOptions<
    CommonResponse<CheckCanAllocateVoucher>,
    Error,
    CheckCanAllocateVoucherParams,
    any
  >;
}

interface UseUpdateVoucherProps {
  options?: UseMutationOptions<
    CommonResponse<number>,
    Error,
    Partial<Voucher>,
    any
  >;
}

interface UseGetAppSettingsProps {
  options?: UseQueryOptions<
    CommonResponse<AppSettings>,
    Error,
    CommonResponse<AppSettings>
  >;
}

interface UseCheckCanAllocateVoucherPropsV2 {
  options?: Partial<UseQueryOptions<CommonResponse<CheckCanAllocateVoucher>, Error>>;
}

export const useGetVoucherList = ({
  params,
  options,
}: UseGetVoucherListProps) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.VOUCHER_LIST, params],
    queryFn: async ({ pageParam }) =>
      await voucherServices.getListVoucher({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const { total } = lastPage?.data || {};

      // Check if the total number of items is defined
      if (total) {
        const currentTotalItems = allPages.flatMap(
          (page) => page?.data?.entries
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

export const useGetAppSettings = ({ options }: UseGetAppSettingsProps = {}) => {
  return useQuery({
    queryKey: [QUERY_KEY.APP_SETTINGS],
    queryFn: voucherServices.getAppSettings,
    ...options,
  });
};

export const useAllocateVoucher = ({
  options,
}: UseAllocateVoucherProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: voucherServices.allocateVoucher,
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.VOUCHER_LIST],
        exact: false,
      });
    },
    ...options,
  });
};

export const useAllocateVoucherAFF = ({
  options,
}: UseAllocateVoucherAFFProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: voucherServices.allocateVoucherAFF,
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.VOUCHER_LIST],
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CHECK_USER_CAN_ALLOCATE],
        exact: false,
      });
    },
    ...options,
  });
};

export const useGetVoucherDetail = (props: UseGetVoucherDetailProps) => {
  const { options, params } = props;

  return useQuery({
    queryKey: [QUERY_KEY.VOUCHER_DETAIL, params],
    queryFn: () => voucherServices.getVoucherDetail(params),
    ...options,
  });
};

export const useUpdateVoucher = ({ options }: UseUpdateVoucherProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: voucherServices.updateVoucher,
    onSettled(data, error, params) {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.VOUCHER_LIST],
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.VOUCHER_DETAIL, { id: `${params?.id || ""}` }],
      });
    },
    ...options,
  });
};

export const useCheckCanAllocateVoucher = (
  props: UseCheckCanAllocateVoucherProps
) => {
  return useMutation({
    mutationFn: voucherServices.checkCanAllocateVoucher,
    ...props.options,
  });
};

export const useCheckCanAllocateVoucherV2 = (
  props: UseCheckCanAllocateVoucherPropsV2
) => {
  return useQuery({
    queryKey: [QUERY_KEY.CHECK_CAN_ALLOCATE_VOUCHER],
    queryFn: () => voucherServices.checkCanAllocateVoucher({}),
    ...props.options,
  });
};
