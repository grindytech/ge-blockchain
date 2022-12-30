import { GETransaction, GETransactionGQL, Hash, Page, Size } from "../../types";

import { GEPagination } from "../../types/pagination";

export interface ITransaction {
  /**
   * Returns the transaction by Hash
   *
   * @param hash - transaction hash
   * @returns transaction
   *
   */
  get_transaction(hash: Hash): Promise<GETransaction>;

  /**
   * Returns the transactions pagination by page number and size per page
   *
   * @param page - page number in transaction table
   * @param size - number of result per page
   * @returns tranasctions
   *
   */
  get_transactions(
    page: Page,
    size: Size
  ): Promise<GEPagination<GETransactionGQL>>;

  /**
   * Returns the latest transactions
   *
   * @param count - number of latest transactions
   * @returns tranasctions
   *
   */
  get_latest_transactions(count: number): Promise<GETransaction[]>;
}
