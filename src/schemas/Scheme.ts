// Libraries
import { z } from "zod";

export const SchemeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  partner: z.string().min(1),
  scheme_code: z.string().min(1),
  point_redeem: z.string().min(1).regex(/^\d+$/),
  original_point: z.string().min(1).regex(/^\d+$/),
  image: z.string().min(1).url(),
  category: z.string().min(1),
  expire_date: z.string().min(1).datetime({ offset: true }),
  terms_condition: z.string().nullable(),
  description: z.string(),
  is_mass_code: z.boolean().optional(),
  mass_code_value: z.string().optional(),
});

export type Scheme = z.infer<typeof SchemeSchema>;
