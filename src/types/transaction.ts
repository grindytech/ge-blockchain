import {
  Hash,
  Height,
  Message,
  Method,
  Raw,
  Status,
  Timestamp,
  Value,
} from "./types";

export interface GETransaction {
  hash: Hash;
  block_hash: Hash;
  block_height: Height;
  method: Method;
  status: Status;
  error_message: Message;
  timestamp: Timestamp;
  from: Hash;
  to: Hash | null;
  value: Value;
  gas_price: Value;
  fee: Value;
  raw: Raw;
}
export type GETransactionGQL = {
  hash: Hash;
  blockHash: Hash;
  blockHeight: Height;
  method: Method;
  status: Status;
  errorMessage: Message;
  timestamp: Timestamp;
  from: Hash;
  to: Hash | null;
  value: Value;
  gasPrice: Value;
  fee: Value;
  raw: Raw;
};
