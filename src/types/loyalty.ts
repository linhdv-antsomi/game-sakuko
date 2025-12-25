import { TRANSACTION_TYPE_KEY } from "constant";
import { UserTransaction } from "schemas";

export interface TransactionResponse {
  customerId: string;
  transactions: UserTransaction[] | null;
  total: number;
}

export type TransactionType =
  (typeof TRANSACTION_TYPE_KEY)[keyof typeof TRANSACTION_TYPE_KEY];
