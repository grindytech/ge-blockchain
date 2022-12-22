import { GEAccount, GETransaction } from "../types";

export interface GEAccountAdaptor {
    get_ge_accounts(transaction_data: GETransaction): Promise<GEAccount[]>;
}
