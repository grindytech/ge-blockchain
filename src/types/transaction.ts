import { Address, Hash, Height, Raw, Status, Timestamp, Value } from "./types";

export interface GETransaction {
  hash: Hash;
  block_hash: Hash;
  block_height: Height;
  status: Status;
  timestamp: Timestamp;
  from: Address;
  to: Address;
  value: Value;
  gas_price: Value;
  fee: Value;
  raw: Raw;
}
export type GETransactionGQL = {
  hash: Hash;
  blockHash: Hash;
  blockHeight: Height;
  status: Status;
  timestamp: Timestamp;
  from: Address;
  to: Address;
  value: Value;
  gasPrice: Value;
  fee: Value;
  raw: Raw;
};
