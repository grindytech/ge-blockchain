export interface GEBlock {
    hash: string;
    height: number;
    transactions: string[];
    timestamp: number;
    parent_hash: string;
    state_root: string;
    raw: string;
}
