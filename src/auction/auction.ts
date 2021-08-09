import {
    CasperServiceByJsonRPC,
    CLPublicKey, CLU512, DeployUtil, RuntimeArgs, Signer,
    decodeBase16
} from 'casper-js-sdk';

import { BigNumber, BigNumberish } from '@ethersproject/bignumber';

export class Auction {

    rpc_api: string;
    auction_hash: string;
    constructor(rpc_api: string, auction_hash: string) {
        this.rpc_api = rpc_api;
        this.auction_hash = auction_hash;
    }

    static build_arguments(delegator: string, validator: string, amount: string, fee: string) {
        return {
            "delegator": CLPublicKey.fromHex(delegator),
            "validator": CLPublicKey.fromHex(validator),
            "amount": BigNumber.from(amount),
            "fee": BigNumber.from(fee)
        }
    }

    static build_deploy(network_name: string, auction_hash: string, entry_point: string, delegator: CLPublicKey, validator: CLPublicKey, amount: BigNumberish, fee: BigNumberish) {
        let deployParams;
        {
            deployParams = new DeployUtil.DeployParams(
                delegator,
                network_name,
            );
        }

        const sessionArgs = RuntimeArgs.fromMap({
            delegator: delegator,
            validator: validator,
            amount: new CLU512(amount)
        });
        const session = DeployUtil.ExecutableDeployItem.newStoredContractByHash(
            decodeBase16(auction_hash),
            entry_point,
            sessionArgs
        );
        const payment = DeployUtil.standardPayment(fee);
        const deploy = DeployUtil.makeDeploy(deployParams, session, payment);
        return deploy;
    }

    async broadcast_deploy(deploy: DeployUtil.Deploy, approvals: DeployUtil.Approval[]) {
        if (approvals.length > 0) {
            let new_approvals = new DeployUtil.Approval();
            new_approvals.signer = approvals[0].signer;
            new_approvals.signature = approvals[0].signature;

            const message = new DeployUtil.Deploy(
                deploy.hash,
                deploy.header,
                deploy.payment,
                deploy.session,
                [new_approvals]
            );
            // deploy contract after sign
            let result;
            {
                const deployService = new CasperServiceByJsonRPC(this.rpc_api);
                result = await deployService.deploy(message);
            }
            return result;
        } else {
            throw Error("Approvals invalid");
        }
    }

    async sign_deploy(from_public_key: string, deploy: DeployUtil.Deploy): Promise<DeployUtil.Approval[]> {
        const deploy_json = DeployUtil.deployToJson(deploy);
        const signed_message = await Signer.sign(
            deploy_json,
            from_public_key,
            deploy.hash.toString(),
        );
        return signed_message.deploy.approvals;
    }
}