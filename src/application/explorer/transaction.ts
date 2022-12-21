import { GETransaction, Hash } from '../../types';

export interface ITransaction {

    /**
    * Returns the transaction by Hash
    *
    * @param hash - transaction hash
    * @returns transaction
    *
    */
    get_transaction(hash: Hash): Promise<GETransaction>;

    /**
    * Returns the latest transactions
    *
    * @param count - number of latest transactions
    * @returns tranasctions
    *
    */
    get_latest_transactions(count: number): Promise<GETransaction[]>;
}