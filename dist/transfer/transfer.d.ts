import { CLPublicKey } from 'casper-js-sdk';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
export declare class Transfer {
    rpc_api: string;
    constructor(rpc_api: string);
    static build_transfer(from_public_key: string, to_public_key: string, amount: string, fee: string): {
        from_public_key: CLPublicKey;
        to_public_key: CLPublicKey;
        amount: BigNumber;
        fee: BigNumber;
    };
    make_transfer(network_name: string, from: CLPublicKey, to: CLPublicKey, amount: BigNumberish, fee: BigNumberish): Promise<any>;
}
