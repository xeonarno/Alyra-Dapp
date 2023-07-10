import { Address } from "viem";
import ContractEvent from "./ContractEvent";

type VoterEvent = ContractEvent<{voterAddress: Address}>

export default VoterEvent;