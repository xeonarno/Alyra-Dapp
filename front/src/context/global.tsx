"use client";
import Voters from "@/enum/Voter";
import React, { createContext, useContext, useState } from "react";


type GlobalContextType = {
	voters: Voters[],
	setVoters: React.Dispatch<React.SetStateAction<Voters[]>>,
}

const GlobalContext = createContext<GlobalContextType>({
	voters:[],
	setVoters:()=>{}
});


export const GlobalContextProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {

	const [voters, setVoters] = useState<Voters[]>([]);
	//-const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatus>(WorkflowStatus.RegisteringVoters);

	return(
		<GlobalContext.Provider value={{ voters, setVoters }}>
			{ children }
		</GlobalContext.Provider>
	);

};

export const useGlobalContext = ()=> useContext(GlobalContext);
