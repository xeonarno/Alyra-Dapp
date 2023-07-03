"use client";
import Proposals from "@/enum/Proposal";
import React, { createContext, useContext, useState } from "react";

type ProposalContextType = {
	proposals: Proposals[],
	setProposals: React.Dispatch<React.SetStateAction<Proposals[]>>,
}

const ProposalContext = createContext<ProposalContextType>({
	proposals:[],
	setProposals:()=>{}
});

export const ProposalContextProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {

	const [proposals, setProposals] = useState<Proposals[]>([]);

	return(
		<ProposalContext.Provider value={{ proposals, setProposals }}>
			{ children }
		</ProposalContext.Provider>
	);
};

export const useProposalContext = ()=> useContext(ProposalContext);