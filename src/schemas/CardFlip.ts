import { z } from "zod";

const CheckCanAllocateVoucherCardFlipSchema = z.object({
  canAllocate: z.boolean(),
  remainPlays: z.number().nullable(),
});

const CheckCanShareGameSchema = z.object({
  canShare: z.boolean(),
  remainingShares: z.number().nullable(),
  dailyShareCount: z.number().nullable(),
})

export type CheckCanAllocateVoucherCardFlip = z.infer<typeof CheckCanAllocateVoucherCardFlipSchema>;
export type CheckCanShareGame = z.infer<typeof CheckCanShareGameSchema>;
