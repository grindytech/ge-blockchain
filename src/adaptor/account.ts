export interface GEAccountAdaptor<TAccount, TTransaction> {
  /**
   * Returns account data from tx
   *
   * @param block_state - current block state root hash
   * @param tx_data - transaction Datas
   * @returns GE account data
   */
  get_ge_accounts(
    block_state: string,
    tx_data: TTransaction[]
  ): Promise<TAccount[]>;

  /**
   * Returns latest block height
   *
   * @returns block state
   */
  get_block_state(): Promise<string>;
}
