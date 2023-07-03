import { Address } from "viem";

type Voter = {
	hasVoted: boolean;
	votedProposalId: number;
	address: Address;
};

export default Voter;