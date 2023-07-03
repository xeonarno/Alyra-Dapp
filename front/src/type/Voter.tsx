import { Address } from "viem";

type Voter = {
	dirty:boolean;
	hasVoted: boolean;
	votedProposalId: number;
	address: Address;
};

export default Voter;