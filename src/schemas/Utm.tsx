import { z } from "zod";

export const UtmSchema = z.object({
  utm_campaign: z.string(),
  utm_content: z.string(),
  utm_medium: z.string(),
  utm_source: z.string(),
  utm_term: z.string(),
  utm_type: z.string(),
});

export type Utm = z.infer<typeof UtmSchema>;
