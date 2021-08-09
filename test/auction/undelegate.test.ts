import { CasperClient, DeployUtil, Keys } from 'casper-js-sdk';
import { assert } from 'chai';
import path from 'path';
import { Undelegate } from '../../src/index';


var rpc_api: string;
var network_name: string;
var validator: string;
var hash: string;
if (process.env.NODE_ENV == "mainnet") {
    rpc_api = "http://35.73.228.244:7777/rpc";
    network_name = "casper";
    validator = "0167e08c3b05017d329444dc7d22518ba652cecb2c54669a69e5808ebcab25e42c";
    hash = "ccb576d6ce6dec84a551e48f0d0b7af89ddba44c7390b690036257a04a3ae9ea";

} else {
    rpc_api = "http://144.91.79.58:7777/rpc";
    network_name = "casper-test";
    validator = "017d96b9a63abcb61c870a4f55187a0a7ac24096bdb5fc585c12a686a4d892009e";
    hash = "21eaea584903e79365bcb1f7607179cc118807033c8919cff7489a91c3a822d1";
}

const folder = path.join('./', 'keys');
const signKeyPair = Keys.Ed25519.parseKeyFiles(
    folder + '/' + 'public.pem',
    folder + '/' + 'private.pem'
);

describe('Undelegate', () => {

    it("it should sign deploy and broadcast successfully", async () => {
        const builders = Undelegate.build_arguments(signKeyPair.publicKey.toHex(),
            validator, "1000000000", "1000000000");
        const deploy = Undelegate.build_deploy("casper", hash, "undelegate",
            builders.delegator, builders.validator, builders.amount, builders.fee);

        const sign_deploy = DeployUtil.signDeploy(deploy, signKeyPair);
        const approvals = sign_deploy.approvals;
        const transfer = new Undelegate(rpc_api, hash);
        const result = await transfer.broadcast_deploy(deploy, approvals);
        assert.notDeepEqual(result, undefined);
        assert.notDeepEqual(result, null);

        const casper_client = new CasperClient(rpc_api);

        casper_client.getDeploy(result.deploy_hash).then(value => {
            assert.deepEqual(value[0].header.account, signKeyPair.publicKey);
        })
        // wait three minutes
        setTimeout(() => {
            casper_client.getDeploy(result.deploy_hash).then(value => {
                console.log(value);
                if (value[1].execution_results.length > 0) {
                    console.log("\x1b[32m", "Deploy undelegate successfully");
                } else {
                    console.log("\x1b[31m", "Deploy transfer fail");
                }
            })
        }, 180000);
    })
})

