import { z } from "zod";

const DealSchema = z.object({
  id: z.number().or(z.string()),
  name: z.string(),
  image: z.string().url(),
  scheme: z.string(),
})

const CheckCanAllocateDealSchema = z.object({

  });


export type CheckCanAllocateDeal =  z.infer<typeof CheckCanAllocateDealSchema>;
export type Deal =  z.infer<typeof DealSchema>;
