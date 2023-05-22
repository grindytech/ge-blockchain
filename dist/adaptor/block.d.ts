import { Height } from "../types";
export interface GEBlockAdaptor<TBlock> {
    /**
    * Returns block data
    *
    * @param block_number - block number, return latest block if not provided
    * @returns block data
    */
    to_ge_block(block_number?: number): Promise<TBlock>;
    /**
    * Returns latest block height
    *
    * @returns block height
    */
    get_block_number(): Promise<Height>;
}
