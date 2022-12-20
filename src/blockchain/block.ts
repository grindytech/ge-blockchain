import { GEBlock } from "../types/block";

export interface GEBlockAdaptor {
    get_block(block_number?: number): Promise<any>;
    to_ge_block(block_data: any): Promise<GEBlock>;
    get_block_number(): Promise<number>;
}

export interface GEBlockProvider {
    get_latest_block(): Promise<GEBlock>;
    write_blockchain_data(ge_block: GEBlock): Promise<GEBlock>;
}