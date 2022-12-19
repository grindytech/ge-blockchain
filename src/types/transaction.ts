export interface GETransaction {
    hash: string;
    block_hash: string;
    block_height: number;
    status: string;
    timestamp: number;
    from: string;
    to: string;
    value: string;
    fee: string;
    raw: string;
}