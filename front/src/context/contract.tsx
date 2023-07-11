"use client";
import React, { createContext, useContext } from "react";
import { Address } from "wagmi";
import * as voting from "./contract/voting";
import { Hash } from "viem";
import Proposals from "@/type/Proposal";
import Voters from "@/type/Voter";
import WorkflowStatus from "@/enum/WorkflowStatus";
import VoterEvent from "@/type/VoterEvent";
import StatusEvent from "@/type/StatusEvent";
import ProposalEvent from "@/type/ProposalEvent";
import VoteEvent from "@/type/VoteEvent";

type ContractContextType = {
    // getOwner: typeof voting.getOwner;
    getOwner(): Promise<Address>,
    getVoter(address: Address): Promise<Voters>,
    getOneProposal(id: string): Promise<Proposals>,
    addVoter(address: string): Promise<Hash>,
    getWinningProposal(): Promise<string>,
    getStatus(): Promise<WorkflowStatus>,
    addProposal(description: string): Promise<Hash>,
    setVote(id: string): Promise<Hash>,
    startProposalsRegistering(): Promise<Hash>,
    endProposalsRegistering(): Promise<Hash>,
    startVotingSession(): Promise<Hash>,
    endVotingSession(): Promise<Hash>,
    tallyVotes(): Promise<Hash>
    listenVoterRegistered(listener: (arg: VoterEvent) => void): () => void,
    listenStatusChanged(listener: (arg: StatusEvent) => void): () => void,
    listenProposalRegistered(listener: (arg: ProposalEvent) => void): () => void,
    listenVoted(listener: (arg: VoteEvent) => void): () => void
} & {
    isAlreadyRegistred(address: Address): Promise<boolean>
}

const ContractContext = createContext<ContractContextType>(voting as ContractContextType);

export const ContractContextProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
    console.log('[[ContractContextProvider]]: INIT !');

    const isAlreadyRegistred = async (address: Address): Promise<boolean> => {
        try {
            console.log(`Ask for address : ${address}`);

            const registered = await voting.getVoter(address);
            console.log('registered', { registered })

            return !!registered;

        } catch (error) {
            return false;
        }
    }
    const value = {
        ...voting,
        isAlreadyRegistred
    } as ContractContextType;

    return (
        <ContractContext.Provider value={value}>
            {children}
        </ContractContext.Provider>
    )
}

export const useContract = () => useContext(ContractContext);

export default ContractContext;