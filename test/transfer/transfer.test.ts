// import { DeployUtil, Keys } from 'casper-js-sdk';
import { isBigNumberish } from '@ethersproject/bignumber/lib/bignumber';
import { CasperClient, DeployUtil, encodeBase16, Keys } from 'casper-js-sdk';
import { assert } from 'chai';
import path from 'path';
import { Transfer } from '../../src/index';

var rpc_api: string;
var network_name: string;
if (process.env.NODE_ENV == "mainnet") {
  rpc_api = "http://35.73.228.244:7777/rpc";
  network_name = "casper";
} else {
  rpc_api = "http://144.91.79.58:7777/rpc";
  network_name = "casper-test";
}

const folder = path.join('./', 'keys');
const signKeyPair = Keys.Ed25519.parseKeyFiles(
  folder + '/' + 'public.pem',
  folder + '/' + 'private.pem'
);

describe('Transfer', () => {

  it('it should create new Transfer class successfully', function () {
    const transfer = new Transfer(rpc_api);
    assert.equal(transfer.rpc_api, rpc_api);
  });

  it('return build deploy arguments correctly', function () {
    const senderKey = Keys.Ed25519.new();
    const recipientKey = Keys.Ed25519.new();
    const builders = Transfer.build_arguments(senderKey.publicKey.toHex(), recipientKey.publicKey.toHex(), "3000000000", "500000000", "1");
    assert.deepEqual(builders.from_public_key, senderKey.publicKey);
    assert.deepEqual(builders.to_public_key, recipientKey.publicKey);
    assert.equal(builders.amount.toString(), "3000000000");
    assert.equal(builders.fee.toString(), "500000000");
    assert.equal(isBigNumberish(builders.amount), true);
    assert.equal(isBigNumberish(builders.fee), true);
  });

  it("it should build deploy successfully", async () => {
    const recipientKey = Keys.Ed25519.new();
    const deploy = Transfer.build_deploy(network_name, signKeyPair.publicKey, recipientKey.publicKey, "3000000000", "500000000", "1");
    assert.deepEqual(deploy.isTransfer(), true);
    assert.deepEqual(deploy.isStandardPayment(), true);
  });

  it("it should sign deploy and broadcast successfully", async () => {
    const builders = Transfer.build_arguments(signKeyPair.publicKey.toHex(), "0167e08c3b05017d329444dc7d22518ba652cecb2c54669a69e5808ebcab25e42c", "3000000000", "500000000", "1");
    const deploy = Transfer.build_deploy(network_name, builders.from_public_key,
      builders.to_public_key, builders.amount, builders.fee, builders.id);
    const sign_deploy = DeployUtil.signDeploy(deploy, signKeyPair);
    const approvals = sign_deploy.approvals;
    const transfer = new Transfer(rpc_api);
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
        if (value[1].execution_results.length > 0) {
          console.log("\x1b[32m", "Deploy transfer successfully: ", encodeBase16(value[0].hash));
        } else {
          console.log("\x1b[31m", "Deploy transfer fail");
        }
      })
    }, 180000);
  })
})

