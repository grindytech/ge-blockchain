import { GEAccount, GETransaction } from "../types";

export interface GEAccountAdaptor {
    get_ge_account(transaction_data: GETransaction): Promise<GEAccount[]>;
}
