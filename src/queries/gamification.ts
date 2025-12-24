import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { APP_CONFIG, QUERY_KEY } from "constant";
import {
  GameCanPlay,
  GameCanShare,
  GameDetail,
  GameLeaderboard,
  GameUserStats,
  PlayGameResponse,
  ShareGame,
} from "schemas";
import { CommonResponse } from "types";

export const useGetCanShare = () => {
  return useQuery<
    CommonResponse<GameCanShare>,
    Error,
    CommonResponse<GameCanShare>
  >({
    queryKey: [QUERY_KEY.GET_CAN_SHARE_GAME, APP_CONFIG.GAME_ID],
    queryFn: () =>
      window?.zma?.gamification?.getCanShare({ gameId: APP_CONFIG.GAME_ID }),
  });
};

export const useGetGameDetail = () => {
  return useQuery<
    CommonResponse<GameDetail>,
    Error,
    CommonResponse<GameDetail>
  >({
    queryKey: [QUERY_KEY.GET_GAME_DETAIL, APP_CONFIG.GAME_ID],
    queryFn: () =>
      window?.zma?.gamification?.getGameDetail({ gameId: APP_CONFIG.GAME_ID }),
  });
};

type GetLeaderBoardProps = {
  options?: Omit<UseQueryOptions<CommonResponse<GameLeaderboard>, Error>, "queryKey" | "queryFn">;
};
export const useGetLeaderBoard = (props?: GetLeaderBoardProps) => {
  return useQuery<
    CommonResponse<GameLeaderboard>,
    Error,
    CommonResponse<GameLeaderboard>
  >({
    queryKey: [QUERY_KEY.GET_GAME_LEADERBOARD, APP_CONFIG.GAME_ID],
    queryFn: () =>
      window?.zma?.gamification?.getLeaderboard({ gameId: APP_CONFIG.GAME_ID }),
    ...(props?.options || {}),
  });
};

export const useGetUserStats = () => {
  return useQuery<
    CommonResponse<GameUserStats>,
    Error,
    CommonResponse<GameUserStats>
  >({
    queryKey: [QUERY_KEY.GET_GAME_USER_STATS, APP_CONFIG.GAME_ID],
    queryFn: () =>
      window?.zma?.gamification?.getUserStats({ gameId: APP_CONFIG.GAME_ID }),
  });
};

export const useGetCanPlay = () => {
  return useQuery<
    CommonResponse<GameCanPlay>,
    Error,
    CommonResponse<GameCanPlay>
  >({
    queryKey: [QUERY_KEY.GET_CAN_PLAY_GAME, APP_CONFIG.GAME_ID],
    queryFn: () =>
      window?.zma?.gamification?.getCanPlay({ gameId: APP_CONFIG.GAME_ID }),
  });
};
interface ShareGameArgs {}
interface ShareGameProps {
  options?: UseMutationOptions<
    CommonResponse<ShareGame>,
    Error,
    ShareGameArgs,
    any
  >;
}
export const useShareGame = (props: ShareGameProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: ShareGameArgs = {}) =>
      window?.zma?.gamification?.shareGame({
        gameId: APP_CONFIG.GAME_ID,
        ...args,
      }),
    onSettled: (data, error) => {
      if (!error) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.GET_CAN_PLAY_GAME, APP_CONFIG.GAME_ID],
          exact: false,
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.GET_CAN_SHARE_GAME, APP_CONFIG.GAME_ID],
          exact: false,
        });
      }
    },
    ...props.options,
  });
};
interface PlayGameArgs {
  bodyData: Record<string, any>;
}
interface PlayGameProps {
  options?: UseMutationOptions<
    CommonResponse<PlayGameResponse>,
    Error,
    PlayGameArgs,
    any
  >;
}
export const usePlayGame = (props: PlayGameProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: PlayGameArgs) =>
      window?.zma?.gamification?.playGame({
        gameId: APP_CONFIG.GAME_ID,
        body: args.bodyData,
      }),

    onSettled() {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.VOUCHER_LIST],
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_CAN_PLAY_GAME, APP_CONFIG.GAME_ID],
        exact: false,
      });
    },
    ...props.options,
  });
};

export const useCheckin = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () => window?.zma?.gamification?.checkin({ gameId: APP_CONFIG.GAME_ID }),
      onSettled() {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.GET_CAN_PLAY_GAME, APP_CONFIG.GAME_ID],
          exact: false,
        });
      },
    });
}
