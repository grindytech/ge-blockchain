import { Address, Balance, Hash, Height, Timestamp } from "./types";

export interface GETransaction {
    hash: Hash;
    block_hash: Hash;
    block_height: Height;
    status: boolean;
    timestamp: Timestamp;
    from: Address;
    to: Address;
    value: Balance;
    gas_price: Balance;
    fee: Balance;
    raw: string;
}