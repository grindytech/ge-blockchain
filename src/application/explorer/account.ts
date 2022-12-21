import { Address, Balance, Hash, Height, GEAccount } from '../../types';

export interface IAccount {

    /**
    * Returns the account data
    *
    * @param address - address
    * @returns account data
    */
    get_account(address: Address): Promise<GEAccount>;

    /**
    * Returns the account balance
    *
    * @param address - address
    * @returns account balance
    */
    get_balance(address: Address): Promise<Balance>;

    /**
    * Returns transactions of account
    *
    * @param address - address
    * @param count - number of latest transactions
    * @returns transactions of account
    */
    get_transactions(address: Address, count: number): Promise<Hash[]>;

    /**
    * Returns block produced of validator account
    *
    * @param address - validator address
    * @param count - number of latest blocks produced
    * @returns latest block produced
    */
    get_produced_blocks(address: Address, count: number): Promise<Height[]>;

    /**
    * Check is account is validator
    *
    * @param address - address
    * @returns is validator
    */
    is_validator(address: Address): Promise<boolean>;
}
