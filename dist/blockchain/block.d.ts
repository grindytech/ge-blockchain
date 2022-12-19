import { GEBlock } from "../types/block";
export interface BlockAdaptor {
    get_block(block_number: number): Promise<any>;
    to_ge_block(block_data: any): Promise<GEBlock>;
}
export interface BlockProvider {
    get_latest_block(): Promise<number>;
    write_blockchain_data(ge_block: GEBlock): Promise<GEBlock>;
}
