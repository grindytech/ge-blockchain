import { Balance, Hash, Height, Timestamp } from "./types";

export interface GEAccount<TAddress> {
  address: TAddress;
  active_block: Height;
  timestamp: Timestamp;
  active_transaction: Hash;
  balance: Balance;
  current_active: Timestamp;
}

export type GEAccountGQL<TAddress> = {
  address: TAddress;
  activeBlock: Height;
  timestamp: Timestamp;
  activeTransaction: Hash;
  balance: Balance;
  currentActive: Timestamp;
};
