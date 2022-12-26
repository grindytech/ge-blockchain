import { Height, Hash, GEBlock, Page, Size } from "../../types";

export interface IBlock {
  /**
   * Returns the block by height or hash
   *
   * @param block - block height or block hash
   * @returns block
   *
   */
  get_block(block: Height | Hash): Promise<GEBlock>;

  /**
   * Returns the blocks pagination by page number and size per page
   *
   * @param page - page number in block table
   * @param size - number of result per page
   * @returns blocks
   *
   */
  get_blocks(page: Page, size: Size): Promise<GEBlock[]>;

  /**
   * Returns transaction hashes in block
   *
   * @param block - block
   * @returns tranasction hahses
   *
   */
  get_transactions(block: Height | Hash): Promise<Hash[]>;

  /**
   * Returns latest blocks
   *
   * @param count - number of latest blocks
   * @returns blocks
   *
   */
  get_latest_blocks(count: number): Promise<GEBlock[]>;
}
