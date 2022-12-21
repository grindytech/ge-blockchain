import { GETransaction } from "../types/transaction";

export interface GETransactionAdaptor {
    get_transaction(transaction_hash: string): Promise<any>;
    to_ge_transaction(transaction_data: any): Promise<GETransaction>;
}

export interface GETransactionProvider {
    get_block_transactions(block: number): Promise<string[]>; 
    get_latest_block(): Promise<number>;
    write_blockchain_data(ge_transaction: GETransaction): Promise<GETransaction>;
}