import { Address, Balance, Hash, Height } from "./types";

export interface GEAccount {
    address: Address;
    block_height: Height; 
    transaction: Hash;
    balance: Balance;
}

export type GEAccountGQL = {
  address: Address;
  balance: Balance[];
  activeBlock: number;
};
