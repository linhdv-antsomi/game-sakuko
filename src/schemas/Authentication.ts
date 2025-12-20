import { z } from "zod";

export const authenticationApiSchema = z.object({
  data: z.object({
    accessToken: z.string().min(20).max(500),
    user: z.object({
      zaloUid: z.string().min(2).max(100),
      phone: z.string(),
    }),
  })
});

export const authenticationSchema = z.object({
  accessToken: z.string().min(20).max(500),
  user: z.object({
    zaloUid: z.string().min(2).max(100),
    phone: z.string(),
  }),
});
export type AuthenticationApi = z.infer<typeof authenticationApiSchema>;
export type Authentication = z.infer<typeof authenticationSchema>;
