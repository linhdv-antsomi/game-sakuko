import { z } from "zod";

const GameDetailSchema = z.object({
  gameId: z.number(),
  name: z.string(),
  startAt: z.string().nullable(),
  endAt: z.string().nullable(),
  status: z.string(),
  metadata: z.object({}).catchall(z.any()),
});

const userLeaderboardSchema = z.object({
  userId: z.string(),
  rank: z.number(),
  name: z.string(),
  avatar: z.string(),
  score: z.number(),
});

const GameLeaderboardSchema = z.object({
  period: z.string(),
  userRank: userLeaderboardSchema,
  leaderboard: z.array(userLeaderboardSchema),
});

const GameUserStatsSchema = z.object({
  userId: z.string(),
  gameId: z.number(),
  remainingTurns: z.number(),
  totalScore: z.number(),
});

const GameCanPlaySchema = z.object({
  canPlay: z.boolean(),
  remainingTurns: z.number(),
});

const GameCanShareSchema = z.object({
  canShare: z.boolean(),
  remainingShares: z.any().nullable(),
});

const ShareGameSchema = z.object({
    success: z.boolean(),
    turnsGranted: z.number(),
    turnsRemaining: z.number(),
    message: z.string(),
})

const PlayGameResponseSchema = z.object({
  success: z.boolean(),
  remainingTurns: z.number(),
  reward: z.object({
    type: z.string(),
    metadata: z.object({
      promotion_code: z.string(),
      scheme_id: z.string(),
      name: z.string(),
      description: z.string(),
      icon: z.string(),
      result_title: z.string(),
      result_description: z.string(),
      type: z.string(),
      expire_type: z.string(),
      expire_value: z.string(),
      voucherId: z.number(),
      globalTracking: z.object({
        view: z.string(),
        impression: z.string(),
        atmTrackingParameters: z.string(),
      }),
    }),
  }),
});

const GameCheckinResponseSchema = z.object({
  success: z.boolean(),
  grantedTurns: z.number(),
  remainingTurns: z.number(),
  message: z.string(),
});

export type GameDetail = z.infer<typeof GameDetailSchema>;

export type GameLeaderboard = z.infer<typeof GameLeaderboardSchema>;

export type GameUserStats = z.infer<typeof GameUserStatsSchema>;

export type GameCanPlay = z.infer<typeof GameCanPlaySchema>;

export type GameCanShare = z.infer<typeof GameCanShareSchema>;

export type ShareGame = z.infer<typeof ShareGameSchema>;

export type PlayGameResponse = z.infer<typeof PlayGameResponseSchema>;

export type GameCheckinResponse = z.infer<typeof GameCheckinResponseSchema>;
