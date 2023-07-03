"use client";
import Voters from "@/type/Voter";
import React, { createContext, useContext, useState } from "react";


type VoterContextType = {
	voters: Voters[],
	setVoters: React.Dispatch<React.SetStateAction<Voters[]>>,
}

const VoterContext = createContext<VoterContextType>({
	voters:[],
	setVoters:()=>{}
});

export const VoterContextProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {

	const [voters, setVoters] = useState<Voters[]>([], );

	// () => {
	// 	const localData = localStorage.getItem('voters');
	// 	return localData ? JSON.parse(localData) : [];
	// }
	return(
		<VoterContext.Provider value={{ voters, setVoters }}>
			{ children }
		</VoterContext.Provider>
	);

};

export const useVoterContext = ()=> useContext(VoterContext);
