import { z } from "zod";

// Define the transaction status enum
export const TransactionStatusEnum = z.enum([
  "PENDING",
  "COMPLETED",
  "FAILED",
  "CANCELLED",
  "REFUNDED",
]);

// Define the transaction type enum
export const TransactionTypeEnum = z.enum(["redeem", "earnings"]);

// Define the Transaction schema
export const TransactionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  amount: z.number(),
  points: z.number().optional(),
  currency: z.string().default("VND"),
  store: z.string().optional(),
  type: TransactionTypeEnum,
  status: TransactionStatusEnum,
  description: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()).optional(),
  completedAt: z.date().or(z.string()).optional(),
});

export const UserTransactionSchema = z.object({
  transactionId: z.string(),
  date: z.string().datetime({ offset: true }),
  storeName: z.string().optional(),
  reference: z.string().optional(),
  transactionAmount: z.number().optional(),
  points: z.number(),
});

// Define the Transaction History schema as an array of transactions
export const TransactionHistorySchema = z.array(TransactionSchema);

// Extract TypeScript types from the schemas
export type TransactionStatus = z.infer<typeof TransactionStatusEnum>;
export type TransactionType = z.infer<typeof TransactionTypeEnum>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type TransactionHistory = z.infer<typeof TransactionHistorySchema>;
export type UserTransaction = z.infer<typeof UserTransactionSchema>;
