import { Auction } from './auction';
export declare class Delegate extends Auction {
    static entry_point: string;
    make_delegate(network_name: string, delegator: string, validator: string, amount: string, fee: string): Promise<any>;
}
