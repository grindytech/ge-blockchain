import { Address, Balance, Hash, Height, Timestamp } from "./types";

export interface GEAccount {
    address: Address;
    block_height: Height;
    timestamp: Timestamp;
    transaction: Hash;
    balance: Balance;
}

export type GEAccountGQL = {
  address: Address;
  balance: Balance[];
  activeBlock: number;
};
