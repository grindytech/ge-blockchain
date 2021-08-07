import {
    CasperServiceByJsonRPC,
    CLPublicKey, DeployUtil, Signer,
} from 'casper-js-sdk';

import { BigNumber, BigNumberish } from '@ethersproject/bignumber';

export class Transfer {

    rpc_api: string;
    constructor(rpc_api: string) {
        this.rpc_api = rpc_api;
    }

    static build_arguments(from_public_key: string, to_public_key: string, amount: string, fee: string) {
        return {
            "from_public_key": CLPublicKey.fromHex(from_public_key),
            "to_public_key": CLPublicKey.fromHex(to_public_key),
            "amount": BigNumber.from(amount),
            "fee": BigNumber.from(fee),
        }
    }

    build_deploy(network_name: string, from: CLPublicKey, to: CLPublicKey, amount: BigNumberish, fee: BigNumberish) {
        let deployParams;
        {
            const ttl = 1800000;
            const gasPrice = 1;
            deployParams = new DeployUtil.DeployParams(
                from,
                network_name,
                gasPrice,
                ttl
            );
        }
        const session = DeployUtil.ExecutableDeployItem.newTransfer(
            amount,
            to,
            null,
            fee
        );
        const payment = DeployUtil.standardPayment(fee);
        const deploy = DeployUtil.makeDeploy(deployParams, session, payment);
        // const deploy_json = DeployUtil.deployToJson(deploy);
        // return deploy_json;
        return deploy;
    }

    async broadcast_deploy(deploy: DeployUtil.Deploy, approvals: DeployUtil.Approval) {
        const message = new DeployUtil.Deploy(
            deploy.hash,
            deploy.header,
            deploy.payment,
            deploy.session,
            [approvals]
        );
        // deploy contract after sign
        let result;
        {
            const deployService = new CasperServiceByJsonRPC(this.rpc_api);
            result = await deployService.deploy(message);
        }
        return result;
    }

    async sign_deploy(from: CLPublicKey, deploy: DeployUtil.Deploy) : Promise<DeployUtil.Approval> {
        const deploy_json = DeployUtil.deployToJson(deploy);
        const signed_message = await Signer.sign(
            deploy_json,
            from.toHex(),
            from.toHex(),
        );
        const approvals = new DeployUtil.Approval();
        approvals.signer = signed_message.deploy.approvals[0].signer;
        approvals.signature = signed_message.deploy.approvals[0].signature;
        return approvals;
    }

    async make_transfer(network_name: string, from: CLPublicKey, to: CLPublicKey, amount: BigNumberish, fee: BigNumberish) {
        const deploy = this.build_deploy(network_name, from, to, amount, fee);
        const approvals = await this.sign_deploy(from, deploy);
        const result = await this.broadcast_deploy(deploy, approvals);
        return result;
    }

}