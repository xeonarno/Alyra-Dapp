"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useOwnerContext } from "./owner";
import { getOneProposal, listenProposalRegistered, addProposal } from "./contract/voting";
import { ContractFunctionExecutionError } from "viem";
import ProposalEvent from "@/type/ProposalEvent";
import Proposal from "@/type/Proposal";


type ProposalContextType = {
	proposals: Proposal[],
	isLoading: boolean,
	addNewProposal(proposalText: string): Promise<void>
	requireProposals(): Promise<void>
}

const ProposalContext = createContext<ProposalContextType>({
	proposals: [],
	isLoading: false,
	addNewProposal: async (proposalText: string) => { },
	requireProposals: async () => { }
});

const PROPOSALS = new Map();

export const ProposalContextProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
	console.log('[[ProposalContextProvider]]: INIT !');
	const [proposals, setProposals] = useState<Proposal[]>(Array.from(PROPOSALS.values()));
	const { isAuth } = useOwnerContext();
	const [isLoading, setLoading] = useState(false);

	const onProposalRegistered = async (event: ProposalEvent) => {
		const { args: { proposalId } } = event;
		console.log('[[onProposalRegistered]]:', { proposalId });
		await registeredProposal(BigInt(proposalId).toString());
	}

	const registeredProposal = async (id: string) => {
		const found = PROPOSALS.has(id);
		console.log('Was found ?', found);
		if (!found) {
			await requireProposals();
		}else{
			setProposals(Array.from(PROPOSALS.values()));
		}
	}

	const requireProposals = async () => {
		if (!isAuth) {
			return;
		}
		let id = PROPOSALS.size;
		setLoading(true);
		try {
			while (true) {
				const proposal = await getOneProposal(String(id));
				PROPOSALS.set(id, proposal);
				id++;
			}
		} catch (error) {
			console.log((error as Error).message);
		}
		setProposals(Array.from(PROPOSALS.values()));
		setLoading(false);
	}

	const addNewProposal = async (proposalText: string) => {
		try {
			await addProposal(proposalText);
		} catch (error) {
			const { details = "" } = error as ContractFunctionExecutionError;
			if (details.includes('Cette proposition existe déjà!')) {
				await requireProposals();
			} else {
				throw error;
			}
		}
	};

	useEffect(() => {
		const unSubscribe = listenProposalRegistered(onProposalRegistered);
		return () => unSubscribe();
	}, []);

	useEffect(() => {
		if (!isAuth) {
			console.log('[[PROPOSALS]]: CLEAR !!!!!!');
			PROPOSALS.clear();
			setProposals(Array.from(PROPOSALS.values()));
		}
	}, [isAuth])

	return (
		<ProposalContext.Provider value={{ proposals, addNewProposal, requireProposals, isLoading }}>
			{children}
		</ProposalContext.Provider>
	);
};

export const useProposalContext = () => useContext(ProposalContext);