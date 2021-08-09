import { CLPublicKey, DeployUtil } from 'casper-js-sdk';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
export declare class Auction {
    rpc_api: string;
    auction_hash: string;
    constructor(rpc_api: string, auction_hash: string);
    static build_arguments(delegator: string, validator: string, amount: string, fee: string): {
        delegator: CLPublicKey;
        validator: CLPublicKey;
        amount: BigNumber;
        fee: BigNumber;
    };
    static build_deploy(network_name: string, auction_hash: string, entry_point: string, delegator: CLPublicKey, validator: CLPublicKey, amount: BigNumberish, fee: BigNumberish): DeployUtil.Deploy;
    broadcast_deploy(deploy: DeployUtil.Deploy, approvals: DeployUtil.Approval[]): Promise<any>;
    sign_deploy(from_public_key: string, deploy: DeployUtil.Deploy): Promise<DeployUtil.Approval[]>;
}
