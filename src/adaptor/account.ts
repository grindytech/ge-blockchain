export interface GEAccountAdaptor<TAccount, TTransaction> {
     /**
    * Returns account data from tx
    *
    * @param transaction_data - Transaction Data
    * @returns GE account data
    */
    get_ge_accounts(transaction_data: TTransaction): Promise<TAccount[]>;
}
