import { Height } from "../types";

export interface GEAccountAdaptor<TAccount, TTransaction> {
  /**
   * Returns account data from tx
   *
   * @param block_number - current block number
   * @param txs_data - list of transaction Datas
   * @returns GE account data
   */
  get_ge_accounts(
    block_number: Height,
    txs_data: TTransaction[]
  ): Promise<TAccount[]>;

  /**
   * Returns latest block height
   *
   * @returns block height
   */
  get_block_number(): Promise<Height>;
}
