import { z } from "zod";

export const CollectionItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(["plus-score", "minus-score", "plus-time", "stun"]),
  itemImage: z.string(),
  scoreImage: z.string(),
  description: z.string().optional(),
  value: z.union([z.string(), z.number()]),
  rateSpawn: z.number(),
});

export type CollectionItem = z.infer<typeof CollectionItemSchema>;
