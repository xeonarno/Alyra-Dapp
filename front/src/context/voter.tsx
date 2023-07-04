"use client";
import Voters from "@/type/Voter";
import React, { createContext, useContext, useState } from "react";
import useLocalStorage from 'use-persisted-state-hook';


type VoterContextType = {
	voters: Voters[],
	setVoters: React.Dispatch<React.SetStateAction<Voters[]>>,
}

const VoterContext = createContext<VoterContextType>({
	voters: [],
	setVoters: () => { }
});

export const VoterContextProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {


	const [voters, setVoters] = useLocalStorage<Voters[]>('voters', [])

	console.log('[[PROVIDER:Voter]] : init', voters);



	return (
		<VoterContext.Provider value={{ voters, setVoters }}>
			{children}
		</VoterContext.Provider>
	);

};

export const useVoterContext = () => useContext(VoterContext);
