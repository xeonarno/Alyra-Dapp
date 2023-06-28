// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;
import "@openzeppelin/contracts/access/Ownable.sol";


/**
 * @author  Franck Massand & Arnaud Palin Sainte Agathe.
 * @title   Allow to vote for proposals.
 * @dev     Contract owner add voters, who can add proposal to vote session and then vote for them.
 * @notice  Add voters; Add proposals; Then vote for a proposal.
 */
contract Voting is Ownable {
    uint public constant MAX_SECURITY_PROPOSAL = 20;
    uint public constant MAX_STRING_LENGTH = 64;
    uint public constant MIN_STRING_LENGTH = 10;

    uint public winningProposalID;
    
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    struct Proposal {
        string description;
        uint voteCount;
    }

    enum  WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    WorkflowStatus public workflowStatus;
    Proposal[] proposalsArray;
    mapping (address => Voter) voters;

    event VoterRegistered(address voterAddress); 
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistered(uint proposalId);
    event Voted (address voter, uint proposalId);
    
    /**
     * @dev     Restricted only to legitim voters.
     */
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }
    
    // on peut faire un modifier pour les états

    // ::::::::::::: GETTERS ::::::::::::: //

    /**
     * @notice  Return Voter data of a specific voter (by its address).
     * @param   _addr  Voter address.
     * @return  Voter  Voter data of a specific voter.
     */
    function getVoter(address _addr) external onlyVoters view returns (Voter memory) {
        return voters[_addr];
    }
    
    /**
     * @notice  Return data of a specific proposal (by its index).
     * @param   _id  Proposal index.
     * @return  Proposal  Proposal data of a specific proposal.
     */
    function getOneProposal(uint _id) external onlyVoters view returns (Proposal memory) {
        return proposalsArray[_id];
    }

 
    // ::::::::::::: REGISTRATION ::::::::::::: // 

    /**
     * @notice  Add new voter to the pool of voters.
     * @dev     Add new voter to the map of voters, set it as registered, then emit VoterRegistered() event.
     * @param   _addr  Voter address to add.
     */
    function addVoter(address _addr) external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Voters registration is not open yet');
        require(voters[_addr].isRegistered != true, 'Already registered');
    
        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }
 

    // ::::::::::::: PROPOSAL ::::::::::::: // 

    /**
     * @notice  Registered voter add a proposal.
     * @dev Returns the length of a given string
     *
     * @param str The string to measure the length of
     * @return The length of the input string
     */
    function strlen(string memory str) public pure returns(uint256) {
      return bytes(str).length;
    }

    /**
     * @notice  Current voter add a proposal.
     * @dev     Add new proposal to the array of proposals, set it with dedicated info, then emit ProposalRegistered() event.
     * @param   _desc  Proposal description.
     */
    function addProposal(string calldata _desc) external onlyVoters {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Proposals are not allowed yet');
        require(keccak256(abi.encode(_desc)) != keccak256(abi.encode("")), 'Vous ne pouvez pas ne rien proposer');
        require(proposalsArray.length < MAX_SECURITY_PROPOSAL, 'Nombre Max. de propositions atteintes');	
        
        uint length = strlen(_desc);
        require( length < MAX_STRING_LENGTH, "Taille max. d'une proposition");   // to avoid gas consumption
        require( length >= MIN_STRING_LENGTH, "Taille min. d'une proposition");   // to avoid stupid proposal

        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        emit ProposalRegistered(proposalsArray.length-1);
    }

    // ::::::::::::: VOTE ::::::::::::: //

    /**
     * @notice  Allow for a registered voter to vote for a proposal.
     * @dev     registered voter can vote for a proposal based by its Id; emit Voted() event.
     * @param   _id  ID of the proposal.
     */
    function setVote( uint _id) external onlyVoters {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        require(voters[msg.sender].hasVoted != true, 'You have already voted');
        require(_id < proposalsArray.length, 'Proposal not found'); // pas obligé, et pas besoin du >0 car uint

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        emit Voted(msg.sender, _id);
    }

    // ::::::::::::: STATE ::::::::::::: //


    /**
     * @notice  Allow change of workflow status from RegisteringVoters to ProposalsRegistrationStarted; Create the basic proposal called GENESIS.
     * @dev     Emit WorkflowStatusChange() event.
     */
    function startProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Registering proposals cant be started now');
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;
        
        Proposal memory proposal;
        proposal.description = "GENESIS";
        proposalsArray.push(proposal);
        
        emit WorkflowStatusChange(WorkflowStatus.RegisteringVoters, WorkflowStatus.ProposalsRegistrationStarted);
    }

    /**
     * @notice  Allow change of workflow status from ProposalsRegistrationStarted to ProposalsRegistrationEnded.
     * @dev     Emit WorkflowStatusChange() event.
     */
    function endProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Registering proposals havent started yet');
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationStarted, WorkflowStatus.ProposalsRegistrationEnded);
    }

    /**
     * @notice  Allow change of workflow status from ProposalsRegistrationEnded to VotingSessionStarted.
     * @dev     Emit WorkflowStatusChange() event.
     */
    function startVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationEnded, 'Registering proposals phase is not finished');
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationEnded, WorkflowStatus.VotingSessionStarted);
    }

    /**
     * @notice  Allow change of workflow status from VotingSessionStarted to VotingSessionEnded.
     * @dev     Emit WorkflowStatusChange() event.
     */
    function endVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted, WorkflowStatus.VotingSessionEnded);
    }


    /**
     * @notice  Allow change of workflow status from VotingSessionEnded to VotesTallied; Declare "officially" the winning proposal by its ID
     * @dev     Emit WorkflowStatusChange() event.
     */
    function tallyVotes() external onlyOwner {
        require(workflowStatus == WorkflowStatus.VotingSessionEnded, "Current status is not voting session ended");
        uint _winningProposalId;
        for (uint256 p = 0; p < proposalsArray.length; p++) {
            if (proposalsArray[p].voteCount > proposalsArray[_winningProposalId].voteCount) {
               _winningProposalId = p;
           }
        }
        winningProposalID = _winningProposalId;
       
        workflowStatus = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.VotesTallied);
    }
}