"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useContract } from "./contract";
import { Text } from "@chakra-ui/react";

type OwnerContextType = {
	isOwner: boolean,
}

const OwnerContext = createContext<OwnerContextType>({
	isOwner:false,
});

export const OwnerContextProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
	const [isOwner,setOwner] = useState(false);
    const { isConnected, address } = useAccount();
    const { getOwner } = useContract();

    useEffect(()=> {
        if(isConnected) 
        {
            const isAdmin = async()=> {
                const owner = await getOwner();
                console.log(`[OwnerContext]: owner: ${owner} / user:${address}`);
                setOwner(address === owner);
                console.log(`[OwnerContext]: change owner to ${owner}: ${address === owner}`);
            }
            isAdmin();
        }else {
            setOwner(false);
        }

    }, [isConnected, address, setOwner, getOwner])

	return(
		<OwnerContext.Provider value={{ isOwner }}>
			{ children }
		</OwnerContext.Provider>
	);
};

export const useOwnerContext = ()=> useContext(OwnerContext);