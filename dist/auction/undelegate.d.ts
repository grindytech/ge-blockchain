import { Auction } from './auction';
export declare class Undelegate extends Auction {
    static entry_point: string;
    make_undelegate(network_name: string, delegator: string, validator: string, amount: string, fee: string): Promise<any>;
}
