// import { DeployUtil, Keys } from 'casper-js-sdk';
import { isBigNumberish } from '@ethersproject/bignumber/lib/bignumber';
import { CasperClient, DeployUtil, Keys } from 'casper-js-sdk';
import { assert } from 'chai';
import path from 'path';
import { Transfer } from '../src/index';

const testnet_rpc = "http://144.91.79.58:7777/rpc";
const network_name = "casper-test";
const folder = path.join('./', 'keys');
// Read keys from the structure created in #Generating key
// tslint:disable-next-line
const signKeyPair = Keys.Ed25519.parseKeyFiles(
  folder + '/' + 'public.pem',
  folder + '/' + 'private.pem'
);

describe('Transfer', () => {

  it('it should create new Transfer class successfully', function () {
    const transfer = new Transfer(testnet_rpc);
    assert.equal(transfer.rpc_api, testnet_rpc);
  });

  it('return build deploy arguments correctly', function () {
    const senderKey = Keys.Ed25519.new();
    const recipientKey = Keys.Ed25519.new();
    const builders = Transfer.build_arguments(senderKey.publicKey.toHex(), recipientKey.publicKey.toHex(), "3000000000", "500000000");
    assert.deepEqual(builders.from_public_key, senderKey.publicKey);
    assert.deepEqual(builders.to_public_key, recipientKey.publicKey);
    assert.equal(builders.amount.toString(), "3000000000");
    assert.equal(builders.fee.toString(), "500000000");
    assert.equal(isBigNumberish(builders.amount), true);
    assert.equal(isBigNumberish(builders.fee), true);
  });

  it("it should build deploy successfully", async () => {
    const recipientKey = Keys.Ed25519.new();
    const deploy = Transfer.build_deploy(network_name, signKeyPair.publicKey, recipientKey.publicKey, "3000000000", "500000000");
    assert.deepEqual(deploy.isTransfer(), true);
    assert.deepEqual(deploy.isStandardPayment(), true);
  });

  it("it should sign deploy and broadcast successfully", async () => {
    const recipientKey = Keys.Ed25519.new();
    const builders = Transfer.build_arguments(signKeyPair.publicKey.toHex(), recipientKey.publicKey.toHex(), "3000000000", "500000000");
    const deploy = Transfer.build_deploy(network_name, builders.from_public_key, builders.to_public_key, builders.amount, builders.fee);
    const sign_deploy = DeployUtil.signDeploy(deploy, signKeyPair);
    const approvals = sign_deploy.approvals;
    const transfer = new Transfer(testnet_rpc);
    const result = await transfer.broadcast_deploy(deploy, approvals);
    assert.notDeepEqual(result, undefined);
    assert.notDeepEqual(result, null);

    const casper_client = new CasperClient(testnet_rpc);

    casper_client.getDeploy(result.deploy_hash).then(value => {
      assert.deepEqual(value[0].header.account, signKeyPair.publicKey);
    })
    // wait three minutes
    setTimeout(() => {
      casper_client.getDeploy(result.deploy_hash).then(value => {
        if(value[1].execution_results.length > 0) {
          console.log("Deploy transfer successfully");
        }
      })
    }, 180000);
  })
})

