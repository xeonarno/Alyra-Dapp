import { Hash } from "@wagmi/core";
import { Address } from "viem";

type ContractEvent<T> = {
    address: Address,
    args:T,
    eventName: string,
    blockHash: Hash,
    blockNumber: bigint,
}

export default ContractEvent;