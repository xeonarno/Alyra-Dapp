"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useContract } from "./contract";
import { useToast } from "@chakra-ui/react";

type OwnerContextType = {
	isOwner: boolean,
}

const OwnerContext = createContext<OwnerContextType>({
	isOwner:false,
});

export const OwnerContextProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
	const [isOwner, setOwner] = useState(false);
    const { isConnected, address } = useAccount();
    const { getOwner } = useContract();
    const toast = useToast();

    useEffect(()=> {
        if(isConnected) 
        {
            const isAdmin = async()=> {
                try {
                    const owner = await getOwner();
                    console.log(`[OwnerContextProvider]: owner: ${owner} / user:${address}`);
                    setOwner(address === owner);
                    console.log(`[OwnerContextProvider]: change owner to ${owner}: ${address === owner}`);

                }catch(error) {
                    toast({
                        title: 'Error.',
                        description: 'Problème administrateur',
                        status: 'error',
                        duration: 4500,
                        isClosable: true,
                        position: 'top',
                    });
                }
            }
            isAdmin();
        }else {
            console.log('[[OwnerContextProvider]]: disable owner (not connected)');
            setOwner(false);
        }

    }, [isConnected, address])

	return(
		<OwnerContext.Provider value={{ isOwner }}>
			{ children }
		</OwnerContext.Provider>
	);
};

export const useOwnerContext = ()=> useContext(OwnerContext);