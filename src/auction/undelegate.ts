import {Auction} from './auction';
export class Undelegate extends Auction {
    static entry_point = "undelegate";
    async make_delegate(network_name: string, delegator: string, validator: string, amount: string, fee: string) {
        const builder = Auction.build_arguments(delegator, validator, amount, fee);
        const deploy = Auction.build_deploy(network_name, this.auction_hash, Undelegate.entry_point ,builder.delegator, builder.validator, builder.amount, builder.fee);
        const approvals = await this.sign_deploy(delegator, deploy);
        const result = await this.broadcast_deploy(deploy, approvals);
        return result;
    }

}