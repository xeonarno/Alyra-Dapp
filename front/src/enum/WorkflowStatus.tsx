enum WorkflowStatus {
	RegisteringVoters,
	ProposalsRegistrationStarted,
	ProposalsRegistrationEnded,
	VotingSessionStarted,
	VotingSessionEnded,
	VotesTallied
};
/*
enum WorkflowStatus {
	RegisteringVoters            = "RegisteringVoters",
	ProposalsRegistrationStarted = "ProposalsRegistrationStarted",
	ProposalsRegistrationEnded   = "ProposalsRegistrationEnded",
	VotingSessionStarted         = "VotingSessionStarted",
	VotingSessionEnded           = "VotingSessionEnded",
	VotesTallied                 = "VotesTallied"
};
*/

export default WorkflowStatus;