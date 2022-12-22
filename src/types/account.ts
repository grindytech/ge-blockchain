import { Address, Balance, Height } from "./types";

export interface GEAccount {
    address: Address;
    balance: Balance[];
    active_block: Height; 
}
