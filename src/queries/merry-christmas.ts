import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { QUERY_KEY } from "constant";
import { CheckCanAllocateVoucherCardFlip } from "schemas";
import {
  AllocateVoucherCardFlipArgs,
  AllocateVoucherCardFlipResponse,
  AllocateVoucherMerryChristmasArgs,
  CheckCanAllocateVoucherArgs,
  GetLeaderBoardChristmasArgs,
  GetLeaderboardChristmasResponse,
  merryChristmasServices,
  ShareGameArgs,
  ShareGameResponse,
} from "services";
import { CommonResponse } from "types";

interface AllocateVoucherProps {
  options?: UseMutationOptions<
    AllocateVoucherCardFlipResponse,
    Error,
    AllocateVoucherMerryChristmasArgs,
    any
  >;
}

export const useAllocateVoucherChristmas = (props: AllocateVoucherProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: AllocateVoucherCardFlipArgs) =>
      merryChristmasServices.allocateVoucher(args),
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.VOUCHER_LIST],
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.CHECK_CAN_ALLOCATE_VOUCHER_CHRISTMAS],
        exact: false,
      });
    },
    ...props.options,
  });
};

interface ShareGameProps {
  options?: UseMutationOptions<ShareGameResponse, Error, ShareGameArgs, any>;
}

export const useShareGameChristmas = (props: ShareGameProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: ShareGameArgs) => merryChristmasServices.shareGame(args),
    onSettled: (data, error) => {
      if (!error) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.CHECK_CAN_ALLOCATE_VOUCHER_CHRISTMAS],
          exact: false,
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.CHECK_CAN_SHARE_GAME_CHRISTMAS],
          exact: false,
        });
      }
    },
    ...props.options,
  });
};

export const useCheckCanShareGameChristmas = () => {
  return useQuery({
    queryKey: [QUERY_KEY.CHECK_CAN_SHARE_GAME_CHRISTMAS],
    queryFn: () => merryChristmasServices.checkCanShareGame(),
  });
};

interface UseCheckCanAllocateVoucherCardFlipProps {
  args?: CheckCanAllocateVoucherArgs;
  options?: Partial<
    UseQueryOptions<CommonResponse<CheckCanAllocateVoucherCardFlip>, Error>
  >;
}

export const useCheckCanAllocateVoucherChristmas = (
  props: UseCheckCanAllocateVoucherCardFlipProps
) => {
  return useQuery({
    queryKey: [QUERY_KEY.CHECK_CAN_ALLOCATE_VOUCHER_CHRISTMAS],
    queryFn: () => merryChristmasServices.checkCanAllocateVoucher({}),
    ...props.options,
  });
};

interface GetLeaderBoardProps {
  args?: GetLeaderBoardChristmasArgs;
  options?: Omit<
    UseQueryOptions<GetLeaderboardChristmasResponse, Error>,
    "queryKey" | "queryFn"
  >;
}
export const useGetLeaderBoardChristmas = (props: GetLeaderBoardProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_LEADER_BOARD_CHRISTMAS, props.args],
    queryFn: () => merryChristmasServices.getLeaderBoard(props.args),
    ...props.options,
  });
};
