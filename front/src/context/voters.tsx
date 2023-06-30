"use client";
import { createContext, useContext, useState } from "react";

const VotersContext = createContext(null);

export const VotersContextProvider = ({ children }) => {

	const [voters, setVoters] = useState([]);

	return(
		<VotersContext.Provider value={{ voters, setVoters }}>
			{ children }
		</VotersContext.Provider>
	);
};

export const useVotersContext = ()=> useContext(VotersContext);