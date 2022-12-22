import { GETransaction } from "../types";

export interface GETransactionAdaptor {
    get_transaction(transaction_hash: string): Promise<any>;
    to_ge_transaction(transaction_data: any): Promise<GETransaction>;
}
