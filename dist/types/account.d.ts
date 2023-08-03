import { Address, Balance, Hash, Height, Timestamp } from "./types";
export interface GEAccount {
    address: Address;
    active_block: Height;
    timestamp: Timestamp;
    active_transaction: Hash;
    balance: Balance;
}
export type GEAccountGQL = {
    address: Address;
    activeBlock: Height;
    timestamp: Timestamp;
    activeTransaction: Hash;
    balance: Balance;
};
