import { CLPublicKey, DeployUtil } from 'casper-js-sdk';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
export declare class Transfer {
    rpc_api: string;
    constructor(rpc_api: string);
    static build_arguments(from_public_key: string, to_public_key: string, amount: string, fee: string): {
        from_public_key: CLPublicKey;
        to_public_key: CLPublicKey;
        amount: BigNumber;
        fee: BigNumber;
    };
    static build_deploy(network_name: string, from: CLPublicKey, to: CLPublicKey, amount: BigNumberish, fee: BigNumberish): DeployUtil.Deploy;
    broadcast_deploy(deploy: DeployUtil.Deploy, approvals: DeployUtil.Approval[]): Promise<any>;
    sign_deploy(from: CLPublicKey, deploy: DeployUtil.Deploy): Promise<DeployUtil.Approval[]>;
    make_transfer(network_name: string, from: CLPublicKey, to: CLPublicKey, amount: BigNumberish, fee: BigNumberish): Promise<any>;
}
