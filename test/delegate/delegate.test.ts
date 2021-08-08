// import { DeployUtil, Keys } from 'casper-js-sdk';
import { isBigNumberish } from '@ethersproject/bignumber/lib/bignumber';
import { CasperClient, DeployUtil, Keys } from 'casper-js-sdk';
import { assert } from 'chai';
import path from 'path';
import { Delegate } from '../../src/index';

const testnet_rpc = "http://144.91.79.58:7777/rpc";
const mainnet_rpc = "http://35.73.228.244:7777/rpc";
const network_name = "casper-test";
const folder = path.join('./', 'keys');
// Read keys from the structure created in #Generating key
// tslint:disable-next-line
const signKeyPair = Keys.Ed25519.parseKeyFiles(
    folder + '/' + 'public.pem',
    folder + '/' + 'private.pem'
);

const testnet_validator = "017d96b9a63abcb61c870a4f55187a0a7ac24096bdb5fc585c12a686a4d892009e";
const mainnet_validator = "0167e08c3b05017d329444dc7d22518ba652cecb2c54669a69e5808ebcab25e42c";

const testnet_hash = "21eaea584903e79365bcb1f7607179cc118807033c8919cff7489a91c3a822d1";
const mainnet_hash = "ccb576d6ce6dec84a551e48f0d0b7af89ddba44c7390b690036257a04a3ae9ea";

describe('Delegate', () => {

    it('it should create new Delegate class successfully', function () {
        const delegate = new Delegate(testnet_rpc, "");
        assert.equal(delegate.rpc_api, testnet_rpc);
    });

    it('return build deploy arguments correctly', function () {
        const builders = Delegate.build_arguments(signKeyPair.publicKey.toHex(), testnet_validator, "1000000000", "3000000000");
        assert.deepEqual(builders.delegator, signKeyPair.publicKey);
        assert.equal(builders.amount.toString(), "1000000000");
        assert.equal(builders.fee.toString(), "3000000000");
        assert.equal(isBigNumberish(builders.amount), true);
        assert.equal(isBigNumberish(builders.fee), true);
    });

    it("it should build deploy successfully", async () => {
        const builders = Delegate.build_arguments(signKeyPair.publicKey.toHex(), testnet_validator, "1000000000", "3000000000");
        const deploy = Delegate.build_deploy(network_name, testnet_hash, builders.delegator, builders.validator, builders.amount, builders.fee);
        assert.deepEqual(deploy.isStandardPayment(), true);
    });

    it("it should sign deploy and broadcast successfully", async () => {
        // self transfer
        const builders = Delegate.build_arguments(signKeyPair.publicKey.toHex(), mainnet_validator, "1000000000", "3000000000");
        const deploy = Delegate.build_deploy("casper", mainnet_hash, builders.delegator, builders.validator, builders.amount, builders.fee);

        const sign_deploy = DeployUtil.signDeploy(deploy, signKeyPair);
        const approvals = sign_deploy.approvals;
        const transfer = new Delegate(mainnet_rpc, mainnet_hash);
        const result = await transfer.broadcast_deploy(deploy, approvals);
        assert.notDeepEqual(result, undefined);
        assert.notDeepEqual(result, null);

        const casper_client = new CasperClient(mainnet_rpc);

        casper_client.getDeploy(result.deploy_hash).then(value => {
            assert.deepEqual(value[0].header.account, signKeyPair.publicKey);
        })
        // wait three minutes
        setTimeout(() => {
            casper_client.getDeploy(result.deploy_hash).then(value => {
                console.log(value);
                if (value[1].execution_results.length > 0) {
                    console.log("\x1b[32m", "Deploy transfer successfully");
                } else {
                    console.log("\x1b[31m", "Deploy transfer fail");
                }
            })
        }, 180000);
    })
})

