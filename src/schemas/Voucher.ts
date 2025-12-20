import { z } from "zod";

// export const VoucherSchema = z.object({
//   id: z.string(),
//   title: z.string(),
//   code: z.string(),
//   description: z.string(),
//   // value: z.number(),
//   // expiry: z.string(),
// });

// export type Voucher = z.infer<typeof VoucherSchema>;

const MetadataSchema = z.object({
  scheme_id: z.string(),
  allocation_pool: z.string(),
  partner: z.string().optional(),
  is_mass_code: z.boolean().optional(),
  mass_code_value: z.string().optional(),
});

const GlobalTrackingSchema = z.object({
  view: z.string().url(),
  impression: z.string().url(),
  atmTrackingParameters: z.string().optional(),
});

const WebContentsSchema = z.object({
  contents: z.object({
    id: z.number(),
    promotion_code: z.string(),
    scheme_id: z.string(),
    icon: z.string().url(),
    description: z.string(),
    expire_time: z.string().datetime({ offset: true }).optional(),
    expire_unit: z.enum(["hours", "days", "months"]).optional(),
    name: z.string(),
    image_url: z.string().url(),
    type: z.enum(["voucher", "redeem"]),
    globalTracking: GlobalTrackingSchema,
    atmTrackingParameters: z.string().optional(),
    expiry_date: z.string(),
    start_date: z.string(),
    expire_value: z.string().optional(),
    expire_type: z.enum(["fixed"]).optional(),

    // Specific fields
    consolationTitle: z.string().optional(),
    consolationMessage: z.string().optional(),
    backgroundColor: z.string().optional(),
    score: z.number().optional(),
    result_title: z.string().optional(),
    result_description: z.string().optional(),
  }),
});

const VoucherSchema = z.object({
  id: z.number().or(z.string()),
  code: z.string(),
  networkId: z.number(),
  appUserId: z.string(),
  name: z.string(),
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
  usedTime: z.string().datetime({ offset: true }),
});

const AllocateVoucherSchema = z.object({
  status: z.boolean(),
  webContents: WebContentsSchema,
  variantId: z.number(),
  storyId: z.number(),
  serverIP: z.string(),
  serverName: z.string(),
  serverTime: z.number(),
  responseTime: z.string(),
});

const CheckCanAllocateVoucherSchema = z.object({
  canAllocate: z.boolean(),
  redemptionCount: z.number(),
  remainPlays: z.number().optional(),
});

export type Voucher = z.infer<typeof VoucherSchema>;
export type AllocateVoucher = z.infer<typeof AllocateVoucherSchema>;
export type CheckCanAllocateVoucher = z.infer<
  typeof CheckCanAllocateVoucherSchema
>;
export type GlobalTracking = z.infer<typeof GlobalTrackingSchema>;
