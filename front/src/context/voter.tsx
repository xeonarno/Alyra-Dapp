"use client";
import Voters from "@/type/Voter";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getVoter, listenVoterRegistered } from "./contract/voting";
import VoterEvent from "@/type/VoterEvent";
import { Address, ContractFunctionExecutionError } from "viem";
import Voter from "@/type/Voter";
import { useContract } from "./contract";
import { useAccount } from "wagmi";
import { useOwnerContext } from "./owner";
import { useVoteContext } from "./vote";


type VoterContextType = {
	voters: Voters[],
	isVoter: boolean;
	checkVoterStatus():Promise<void>
	addNewVoter (voterAddress: string):Promise<void>
}

const VoterContext = createContext<VoterContextType>({
	voters: [],
	isVoter: false,
	checkVoterStatus: async () => {},
	addNewVoter: async (voterAddress: string) => {}
});

const VOTERS = new Map();

export const VoterContextProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
	console.log('[[VoterContextProvider]]: INIT !');
	const [voters, setVoters] = useState<Voters[]>(Array.from(VOTERS.values()));
	const [isVoter, setVoter] = useState(false);
	const { addVoter } = useContract();
	const { address:userAddress}= useAccount();
	const { isAuth } = useOwnerContext();
	const { setVoted } = useVoteContext();

	const onVoterRegistered = (event: VoterEvent) => {
		const { args: { voterAddress } } = event;
		console.log('[[onVoterRegistered]]:', { voterAddress });
		registeredVoter(voterAddress);
	}

	const registeredVoter = (address: Address) => {
		const voter: Voter = {
			address,
			votedProposalId: 0,
			hasVoted: false,
			dirty: true,
		}

		// Addresses are uniques
		const found = VOTERS.has(address);
		if (!found) {
			if(address == userAddress) {
				setVoter(true);
			}
			console.log('[[registeredVoter]][ADD]', voter);
			console.table(voters);
			VOTERS.set(address, voter);
			setVoters(Array.from(VOTERS.values()));
		}
	}

	const addNewVoter = async (voterAddress: string) => {
		console.log('[[addNewVoter]]:', voterAddress);
		try {
			await addVoter(voterAddress);
		} catch (error) {
			console.log(error);
			const { details = "" } = error as ContractFunctionExecutionError;
			if (details.includes('Already registered')) {
				registeredVoter(voterAddress as Address);
			} else {
				throw error;
			}
		}
	}

	const checkVoterStatus = async () => {
		try {
			if(userAddress) {
				const voter = await getVoter(userAddress);
				console.log('Current voter :', voter);
				registeredVoter(userAddress);
				if(voter.hasVoted)
				{
					console.log('User already vote !');
					setVoted(true);
				}
			}else{
				throw new Error('[[checkVoterStatus]] failure: no address available', userAddress);
			}
		} catch (error) {
			console.error(error);
		}
		const voter = VOTERS.has(userAddress);
		console.log('isVoter ?', voter);
		setVoter(voter);
	}

	useEffect(() => {
		setVoter(VOTERS.has(userAddress));
		const unSubscribe = listenVoterRegistered(onVoterRegistered);
		return () => unSubscribe();
	}, []);

	useEffect(()=> {
		if(!isAuth) {
			console.log('[[VOTERS]]: CLEAR !!!!!!');
			VOTERS.clear();
			setVoters(Array.from(VOTERS.values()));
		}
	}, [isAuth])

	return (
		<VoterContext.Provider value={{ voters, addNewVoter,checkVoterStatus, isVoter}}>
			{children}
		</VoterContext.Provider>
	);

};

export const useVoterContext = () => useContext(VoterContext);
