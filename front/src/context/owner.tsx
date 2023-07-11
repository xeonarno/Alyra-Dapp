"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useContract } from "./contract";
import { useToast } from "@chakra-ui/react";

type OwnerContextType = {
	isOwner: boolean,
    isAuth: boolean,
}

const OwnerContext = createContext<OwnerContextType>({
	isOwner:false,
    isAuth:false,
});

export const OwnerContextProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
	console.log('[[OwnerContextProvider]]: INIT !');
    const [isOwner, setOwner] = useState(false);
    const [isAuth, setAuth] = useState(false);

    const { isConnected, address } = useAccount();
    const { getOwner } = useContract();

    const toast = useToast();

    useEffect(()=> {
      
        console.log('[[OWNER]]  connected :', isConnected);
        if(isConnected && address)
        {
            const isAdmin = async()=> {
                try {
                    const owner = await getOwner();
                    console.log(`[OwnerContextProvider]: owner: ${owner} / user:${address}`);
                    setOwner(address === owner);
                    setAuth(true);
                    console.log(`[OwnerContextProvider]: change owner to ${owner}: ${address === owner}`);

                }catch(error) {
                    console.error(error);
                    toast({
                        title: 'Error.',
                        description: 'Problème administrateur, reload in 3sec...',
                        status: 'error',
                        duration: 4500,
                        isClosable: true,
                        position: 'top',
                    });
                    // Problem with Solidity
                    setTimeout(()=> {
                        window.location.reload();
                    },3000);
                }
            }
            isAdmin();
        }else {
            console.log('[[OwnerContextProvider]]: disable owner (not connected)');
            setOwner(false);
        }

    }, [isConnected, address])

	return(
		<OwnerContext.Provider value={{ isOwner, isAuth }}>
			{ children }
		</OwnerContext.Provider>
	);
};

export const useOwnerContext = ()=> useContext(OwnerContext);