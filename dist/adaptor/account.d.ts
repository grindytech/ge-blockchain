export interface GEAccountAdaptor<TAccount, TTransaction> {
    /**
     * Returns account data from tx
     *
     * @param txs_data - list of transaction Datas
     * @returns GE account data
     */
    get_ge_accounts(txs_data: TTransaction[]): Promise<TAccount[]>;
}
