"use client";
import React, { createContext, useContext, useState } from "react";


type Voters = string;

type VotersContextType = {
	voters: Voters[],
	setVoters: React.Dispatch<React.SetStateAction<Voters[]>>,
}

const VotersContext = createContext<VotersContextType>({
	voters:[],
	setVoters:()=>{}
});

export const VotersContextProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {

	const [voters, setVoters] = useState<Voters[]>([]);

	return(
		<VotersContext.Provider value={{ voters, setVoters }}>
			{ children }
		</VotersContext.Provider>
	);
};

export const useVotersContext = ()=> useContext(VotersContext);
