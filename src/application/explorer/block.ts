import { Height, Hash, GEBlock} from "../../types";

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
  * Returns the blocks by a range
  *
  * @param from_block - from block height
  * @param to_block - to block height, if not provided to_block will be highest block
  * @returns blocks
  *
  */
  get_blocks(from_block: Height, to_block?: Height): Promise<GEBlock[]>;

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
