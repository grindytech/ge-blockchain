import { Hash } from "../types";

export interface GETransactionAdaptor<TTransaction> {
    /**
    * Returns transaction data
    *
    * @param transaction_hash - transaction hash
    * @returns GE transaction data
    */
    to_ge_transaction(transaction_hash: Hash): Promise<TTransaction>;
}
