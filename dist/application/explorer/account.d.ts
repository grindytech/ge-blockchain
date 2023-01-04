import { Address, Balance, GEAccount, Page, Size, GEBlockGQL, GETransactionGQL } from "../../types";
import { GEPagination } from "../../types/pagination";
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
     * @param page - page number in transactions table
     * @param size - number of result per page
     * @returns transactions of account
     */
    get_transactions(address: Address, page: Page, size: Size): Promise<GEPagination<GETransactionGQL>>;
    /**
     * Returns block produced of validator account
     *
     * @param address - validator address
     * @param page - page number in blocks produced table
     * @param size - number of result per page
     * @returns latest block produced
     */
    get_produced_blocks(address: Address, page: Page, size: Size): Promise<GEPagination<GEBlockGQL>>;
    /**
     * Check is account is validator
     *
     * @param address - address
     * @returns is validator
     */
    is_validator(address: Address): Promise<boolean>;
}
