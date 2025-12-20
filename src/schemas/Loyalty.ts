import { z } from "zod";

export const LoyaltyCustomerSchema = z.object({
  customerId: z.string(),
  phoneNumber: z.string(),
  customerName: z.string(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  addressDetailInfo: z.object({
    state: z.string(),
    district: z.string(),
    detail1: z.string(),
    detail2: z.string(),
  }),
  dateOfBirth: z.string(),
  membershipLevel: z.enum(["MEMBER", "SILVER", "GOLD", "PLATINUM"]),
  membershipCard: z.string(),
  availablePoints: z.number(),
  dateExpire: z.string(),
  favoriteDish: z.string(),
  favoriteStore: z.string(),
  spendingAmount: z.number(),
  createdAt: z.string(),
  nextDowngradeMembershipDate: z.string(),
  remainingAmountKeepgrade: z.number(),
  remainingAmountUpgrade: z.number(),
});

export const CreateLoyaltyCustomerSchema = z.object({
  phoneNumber: z.string(),
  customerName: z.string(),
});

export const HotNewsSchema = z.object({
  image_url: z.string(),
  destination_url: z.string(),
  title: z.string(),
  description: z.string(),
  navigate: z.object({
    path: z.string(),
    options: z
      .object({
        newParams: z.record(z.string(), z.string()).optional(),
        keepExistingParams: z.boolean().optional(),
      })
      .optional(),
  }),
});

export type CreateLoyaltyCustomer = z.infer<typeof CreateLoyaltyCustomerSchema>;
export type LoyaltyCustomer = z.infer<typeof LoyaltyCustomerSchema>;
export type UpdateLoyaltyCustomer = Partial<LoyaltyCustomer>;
export type HotNews = z.infer<typeof HotNewsSchema>;
