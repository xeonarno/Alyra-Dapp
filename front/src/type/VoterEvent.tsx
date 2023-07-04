import { Hash } from "@wagmi/core";
import { Address } from "viem";

type VoterEvent = {
    address: Address,
    args: {
        voterAddress: Address,
    }
    eventName: string,
    blockHash: Hash,
    blockNumber: bigint,
}

export default VoterEvent;