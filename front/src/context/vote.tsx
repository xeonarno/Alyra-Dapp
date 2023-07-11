"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useContract } from "./contract";
import VoteEvent from "@/type/VoteEvent";
import { Address } from "viem";
import { useAccount } from "wagmi";

type VoteContextType = {
    hasVoted: boolean,
    winner: number,
    setVoted: React.Dispatch<React.SetStateAction<boolean>>,
    addNewVote(index: number): Promise<void>,
    getTheWinner(): Promise<void>
}

const VoteContext = createContext<VoteContextType>({
    hasVoted: false,
    winner: -1,
    setVoted: ()=> {},
    addNewVote: async (_: number) => { },
    getTheWinner: async () => {}
});

export const VoteContextProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
    console.log('[[VoteContextProvider]]: INIT !');
    const [hasVoted, setVoted] = useState(false);
    const { setVote, listenVoted , getWinningProposal} = useContract();

    const [winner, setWinner] = useState(-1);
    const { address } = useAccount();

    const onVoteRegistered = (event: VoteEvent) => {
        const { args: { voter, proposalId } } = event;
        console.log('[[onVoteRegistered]]:', { voter, proposalId });
        registeredVote(voter);
    }

    const registeredVote = (voter:Address) => {
        console.log('Voted : ', voter, address);
        if(voter === address) {
            console.log('User Voted !');
            setVoted(true);
        }else{
            console.log('Another user voted !');
        }
    }

    const getTheWinner = async () => {
        try{
            const id = await getWinningProposal();
            setWinner(Number(id));
        }catch(error) {
            console.log(error);
        }
    }

    const addNewVote = async (index: number) => {
        try {
            await setVote(String(index));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const unSubscribe = listenVoted(onVoteRegistered);
        return () => unSubscribe();
    }, []);

    return (
        <VoteContext.Provider value={{ hasVoted, addNewVote, winner, getTheWinner, setVoted }}>
            {children}
        </VoteContext.Provider>
    );
};

export const useVoteContext = () => useContext(VoteContext);