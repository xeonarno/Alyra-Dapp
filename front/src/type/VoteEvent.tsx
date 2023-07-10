import { Address } from "viem";
import ContractEvent from "./ContractEvent";

type Vote = {
    voter: Address
    proposalId:bigint
}

type VoteEvent = ContractEvent<Vote>;

export default VoteEvent;