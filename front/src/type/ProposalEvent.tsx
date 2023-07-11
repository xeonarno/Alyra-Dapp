

import ContractEvent from "./ContractEvent";

type Proposal = {
    proposalId: bigint
}

type ProposalEvent = ContractEvent<Proposal>;

export default ProposalEvent;