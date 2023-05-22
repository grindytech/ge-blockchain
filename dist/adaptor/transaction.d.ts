import { Hash } from "../types";
export interface GETransactionAdaptor<TTransaction> {
    /**
     * Returns transaction data
     *
     * @param tx_hashes - list of transaction hashes
     * @returns GE transaction data
     */
    to_ge_transaction(tx_hashes: Hash[]): Promise<TTransaction[]>;
}
