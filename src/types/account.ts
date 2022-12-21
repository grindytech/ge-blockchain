import { Address, Balance, Timestamp } from "./types";

export interface GEAccount {
    address: Address;
    balance: Balance;
    active_time: Timestamp; 
}
