import { Hash } from "../types";
export interface GETransactionAdaptor<TTransaction> {
    /**
     * Returns latest block height
     *
     * @param block - block number
     * @returns block state
     */
    get_block_state(block: number): Promise<string>;
    /**
     * Returns transaction data
     *
     * @param tx_hashes - list of transaction hashes
     * @returns GE transaction data
     */
    to_ge_transaction(tx_hashes: Hash[], block_state?: string): Promise<TTransaction[]>;
}
