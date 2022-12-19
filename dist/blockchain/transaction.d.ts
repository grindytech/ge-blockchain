import { GETransaction } from "../types/transaction";
export interface TransactionAdaptor {
    get_transaction(transaction_hash: string): Promise<any>;
    to_ge_transaction(transaction_data: any): Promise<GETransaction>;
}
export interface TransactionProvider {
    get_latest_block(): Promise<number>;
    write_blockchain_data(ge_transaction: GETransaction): Promise<GETransaction>;
}
