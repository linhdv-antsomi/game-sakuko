import { z } from "zod";

const MetadataSchema = z.object({
  scheme_id: z.string(),
  allocation_pool: z.string(),
});

const OfferVoucherSchema = z.object({
  id: z.number().or(z.string()),
  code: z.string(),
  networkId: z.number(),
  appUserId: z.string(),
  name: z.string(),
  brand: z.string(),
  description: z.string(),
  icon: z.string().url(),
  imageUrl: z.string().url(),
  type: z.enum(["voucher"]),
  gameType: z.enum(["li_xi"]),
  discountType: z.enum(["fixed"]),
  discountValue: z.number(),
  minimumPurchaseAmount: z.number(),
  maximumDiscountAmount: z.number(),
  startDate: z.string().nullable(),
  expiryDate: z.string().datetime({ offset: true }),
  status: z.enum(["available", "used", "expired", "cancelled"]),
  metadata: MetadataSchema,
  ctime: z.string().datetime({ offset: true }),
  utime: z.string().datetime({ offset: true }),
});

export type OfferVoucher = z.infer<typeof OfferVoucherSchema>;
