import { z } from "zod";

export const LeaderBoardItemSchema = z.object({
  phone: z.string(),
  userId: z.string(),
  name: z.string(),
  score: z.number(),
  playTime: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  rank: z.number(),
  avatar: z.string(),
});

export type LeaderBoardItem = z.infer<typeof LeaderBoardItemSchema>;
