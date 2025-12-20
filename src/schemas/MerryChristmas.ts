import { z } from "zod";

export const ChristmasItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(["plus-score", "minus-score", "plus-time"]),
  itemImage: z.string(),
  scoreImage: z.string(),
  description: z.string().optional(),
  value: z.union([z.string(), z.number()]),
  rateSpawn: z.number(),
});

const CheckCanAllocateVoucherChristmasSchema = z.object({
  canAllocate: z.boolean(),
  remainPlays: z.number().nullable(),
});

const CheckCanShareChristmasSchema = z.object({
  canShare: z.boolean(),
  remainingShares: z.number().nullable(),
  dailyShareCount: z.number().nullable(),
});

export type ChristmasItem = z.infer<typeof ChristmasItemSchema>;
export type CheckCanAllocateVoucherChristmas = z.infer<
  typeof CheckCanAllocateVoucherChristmasSchema
>;
export type CheckCanShareChristmas = z.infer<typeof CheckCanShareChristmasSchema>;
