export interface GETransaction {
    hash: string;
    block_hash: string;
    block_height: number;
    status: boolean;
    timestamp: number;
    from: string;
    to: string;
    value: string;
    gas_price: string;
    fee: string;
    raw: string;
}