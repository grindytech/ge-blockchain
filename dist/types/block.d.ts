import { Address, Hash, Height, Raw, Timestamp } from "./types";
export interface GEBlock {
    hash: Hash;
    height: Height;
    transactions: Hash[];
    timestamp: Timestamp;
    parent_hash: Hash;
    state_root: Hash;
    producer: Address;
    raw: Raw;
}
export type GEBlockGQL = {
    hash: Hash;
    height: Height;
    transactions: string[];
    timestamp: Timestamp;
    parentHash: Hash;
    stateRoot: Hash;
    producer: Address;
    raw: Raw;
};
