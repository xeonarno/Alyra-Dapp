import { Hash, PrepareWriteContractConfig,
    ReadContractConfig, prepareWriteContract,
    readContract, writeContract, WatchContractEventConfig,
    WatchContractEventCallback,
    watchContractEvent
} from '@wagmi/core';
import { Address } from 'viem';
import Voting from "@/../public/Voting.json";
import Voters from '@/type/Voter';
import Proposals from '@/type/Proposal';
import WorkflowStatus from '@/enum/WorkflowStatus';
import VoterEvent from '@/type/VoterEvent';
import StatusEvent from '@/type/StatusEvent';
import ProposalEvent from '@/type/ProposalEvent';
import VoteEvent from '@/type/VoteEvent';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const CONTRACT_ABI = Voting.abi;
const base = {
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
}

const Contract = {
    async get<T>(params: Partial<ReadContractConfig>) {
        const options = {
            ...base,
            ...params,
        } as ReadContractConfig;
        console.log(`-[${params.functionName}]`, {params});
        const result = await readContract(options);
        console.log(`-[${params.functionName}]`, {result});
        return result as T;
    },

    async set(params: Partial<PrepareWriteContractConfig>) {
        const options = {
            ...base,
            ...params
        } as PrepareWriteContractConfig
        console.log(`-[${params.functionName}]`, {params});
        const config = await prepareWriteContract(options);

        const { hash } = await writeContract(config);
        console.log(`-[${params.functionName}]`, {hash});

        return hash as Hash;
    },
    listen<T>(params: Partial<WatchContractEventConfig>, listener : (args:T) => void ) {
        const options = {
            ...base,
            ...params
        } as WatchContractEventConfig;
        const callback  = (log: Parameters<WatchContractEventCallback>[0]) =>{
            console.log(`-[${params.eventName}]: `, log);
            const [data] = log;

            listener(data as T);
        }
        console.log(`-[${params.eventName}][ON]`, {options});
        const unSubscribe = watchContractEvent(options, callback)
        return unSubscribe;
    }
}

// Function

export const getOwner = async () => {
    const result = await Contract.get<Address>({
        functionName: 'owner'
    })
    return result;
}

/**
   * @notice  Return Voter data of a specific voter (by its address).
   * @param   _addr  Voter address.
   * @return  Voter  Voter data of a specific voter.
   */
export const getVoter = async (address: Address) => {
    const result = await Contract.get<Voters>({
        args: [address], functionName: 'getVoter',
    });
    return result;
}

/**
 * @notice  Return data of a specific proposal (by its index).
 * @param   _id  Proposal index.
 * @return  Proposal  Proposal data of a specific proposal.
 */
export const getOneProposal = async (id: string) => {
    const result = await Contract.get<Proposals>({ args: [id], functionName: 'getOneProposal' });
    return result;
}

/**
* @notice  Add new voter to the pool of voters.
* @dev     Add new voter to the map of voters, set it as registered, then emit VoterRegistered() event.
* @param   _addr  Voter address to add.
*/
export const addVoter = async (address: string) => {
    const result = await Contract.set({
        args: [address], functionName: 'addVoter',
    });
    return result;
}

export const getWinningProposal = async () => {
    const result = await Contract.get<string>({
        functionName: 'winningProposalID'
    })
    return result;
}

export const getStatus = async () => {
    const result = await Contract.get<WorkflowStatus>({
        functionName: 'workflowStatus'
    })
    return result;
}

/**
 * @notice  Current voter add a proposal.
 * @dev     Add new proposal to the array of proposals, set it with dedicated info, then emit ProposalRegistered() event.
 * @param   _desc  Proposal description.
 */
export const addProposal = async (description: string) => {
    const result = await Contract.set({
        args: [description], functionName: 'addProposal',
    });
    return result;
}

/**
 * @notice  Allow for a registered voter to vote for a proposal.
 * @dev     registered voter can vote for a proposal based by its Id; emit Voted() event.
 * @param   _id  ID of the proposal.
 */
export const setVote = async (id: string) => {
    const result = await Contract.set({
        args: [id], functionName: 'setVote',
    });
    return result;
}

/**
 * @notice  Allow change of workflow status from RegisteringVoters to ProposalsRegistrationStarted; Create the basic proposal called GENESIS.
 * @dev     Emit WorkflowStatusChange() event.
 */
export const startProposalsRegistering = async () => {
    const result = await Contract.set({
        functionName: 'startProposalsRegistering',
    });
    return result;
}

/**
 * @notice  Allow change of workflow status from ProposalsRegistrationStarted to ProposalsRegistrationEnded.
 * @dev     Emit WorkflowStatusChange() event.
 */
export const endProposalsRegistering = async () => {
    const result = await Contract.set({
        functionName: 'endProposalsRegistering',
    });
    return result;
}

/**
 * @notice  Allow change of workflow status from ProposalsRegistrationEnded to VotingSessionStarted.
 * @dev     Emit WorkflowStatusChange() event.
 */
export const startVotingSession = async () => {
    const result = await Contract.set({
        functionName: 'startVotingSession',
    });
    return result;
}

/**
 * @notice  Allow change of workflow status from VotingSessionStarted to VotingSessionEnded.
 * @dev     Emit WorkflowStatusChange() event.
 */
export const endVotingSession = async () => {
    const result = await Contract.set({
        functionName: 'endVotingSession',
    });
    return result;
}

/**
 * @notice  Allow change of workflow status from VotingSessionEnded to VotesTallied; Declare "officially" the winning proposal by its ID
 * @dev     Emit WorkflowStatusChange() event.
 */
export const tallyVotes = async () => {
    const result = await Contract.set({
        functionName: 'tallyVotes',
    });
    return result;
}

// event VoterRegistered(address voterAddress);
export const listenVoterRegistered = (listener : (event: VoterEvent) => void)=> {
    const unwatch = Contract.listen({eventName:'VoterRegistered'}, listener);
    return unwatch;
}

// event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
export const listenStatusChanged = (listener : (event: StatusEvent) => void)=> {
    const unwatch = Contract.listen({eventName:'WorkflowStatusChange'}, listener);
    return unwatch;
}

// event ProposalRegistered(uint proposalId);
export const listenProposalRegistered = (listener : (event: ProposalEvent) => void)=> {
    const unwatch = Contract.listen({eventName:'ProposalRegistered'}, listener);
    return unwatch;
}

// event Voted (address voter, uint proposalId);
export const listenVoted = (listener : (event: VoteEvent) => void)=> {
    const unwatch = Contract.listen({eventName:'Voted'}, listener);
    return unwatch;
}
