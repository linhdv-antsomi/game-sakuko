// Libraries
import { z } from "zod";

export const CheckUserResponseSchema = z.object({
  status: z.boolean(),
  user: z.object({
    name: z.string(),
    phone: z.string(),
    idByOa: z.string(),
  }),
});

/**
 * Schema for CDPCustomer
 */
export const CDPCustomerSchema = z.object({
  /**
   * Customer id
   */
  customerId: z.string(),
  /**
   * Customer name
   */
  name: z.string().optional(),
  /**
   * Customer phone
   */
  phone: z.string().optional(),
  /**
   * OA id
   */
  idByOa: z.string().optional(),
  /**
   * Date customer join tem collector
   */
  joinTemDate: z.date().optional(),
})

export type CheckUserResponse = z.infer<typeof CheckUserResponseSchema>;
export type CDPCustomer = z.infer<typeof CDPCustomerSchema>;