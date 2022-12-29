import { Balance, GEAccountGQL, GEPagination } from "../../types";

export interface IBlockchain {
  /**
   * Returns transaction volume
   *
   * @param from_date - from date
   * @param to_date - to date
   * @returns transaction volume
   *
   */
  get_tx_volume(
    from_date: Date | number | string,
    to_date: Date | number | string
  ): Promise<[]>;

  /**
   * Returns circulating supply
   */
  get_circulating_supply(): Promise<Balance>;

  /**
   * Returns total number of accounts
   */
  get_accounts(): Promise<number>;

  /**
   * Returns number of new accounts by a range
   *
   * @param from_date - from date
   * @param to_date - to date
   * @returns number of new accounts
   *
   */
  get_new_account(
    from_date: Date | number | string,
    to_date: Date | number | string
  ): Promise<number>;

  /**
   * Returns table of richest accounts
   *
   * @param page - page number of table rich list account
   * @param size - number of result per page
   */
  get_rich_list(
    page: number,
    size: number
  ): Promise<GEPagination<GEAccountGQL>>;
}
