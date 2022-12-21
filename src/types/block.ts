import { Hash, Height, Raw, Timestamp } from "./types";

export interface GEBlock {
  hash: Hash;
  height: Height;
  transactions: Hash[];
  timestamp: Timestamp;
  parent_hash: Hash;
  state_root: Hash;
  raw: Raw;
}
