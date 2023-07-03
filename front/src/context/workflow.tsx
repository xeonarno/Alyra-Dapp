"use client";
import WorkflowStatus from "@/enum/WorkflowStatus";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useContract } from "./contract";

// VIEM (pour les events)
import { Address, GetLogsParameters, createPublicClient, http, parseAbiItem } from 'viem'
import { hardhat } from 'viem/chains'
import { useContractEvent } from "wagmi";

import Voting from "@/../public/Voting.json";

type WorkflowStatusContextType = {
	workflowStatus:WorkflowStatus,
	updateWorkflowStatus(status: WorkflowStatus): void,
}

const WorkflowStatusContext = createContext<WorkflowStatusContextType>({
	workflowStatus:WorkflowStatus.RegisteringVoters,
	updateWorkflowStatus:()=>{},
});


 // Create client for Viem
 const client = createPublicClient({
	chain: hardhat,
	transport: http(),
})

export const WorkflowStatusContextProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {

	const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatus>(WorkflowStatus.RegisteringVoters);
	const { getStatus, listenStatusChanged } = useContract();

	const onStatusChanged = (...args: any[]) => {
		console.log('[onStatusChanged]',...args);
		// setWorkflowStatus(status);
	}
	// useContractEvent({
	// 	address:process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
	// 	abi: Voting.abi,
	// 	eventName: 'WorkflowStatusChange',
	// 	listener(log) {
	// 	  console.log('WorkflowStatusChange!!!! ', log)
	// 	},
	//   })

	const updateWorkflowStatus = (status: WorkflowStatus)=> {
		setWorkflowStatus(status);
	}

	useEffect(() => {
		console.log('UPDATE INITIAL STATUS !');
		const watcher = listenStatusChanged(onStatusChanged);

        const reachStatus = async () => {
            const status = await getStatus();
			// try{
			// 	const options = {
			// 		address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
			// 		fromBlock: BigInt(0),
			// 		toBlock: 'latest'
			// 	} as GetLogsParameters;
			// 	console.log('[[OPTIONS]]', options);
			// 	const logs = await client.getLogs(options);
			// 	console.log('[[STATUS LOGS]]', logs);
			// }catch(error) {
			// 	console.error(error as Error);
			// }
            setWorkflowStatus(status);
        }
        reachStatus();
		return ()=> watcher();

    }, [])

	return(
		<WorkflowStatusContext.Provider value={{workflowStatus, updateWorkflowStatus}}>
			{ children }
		</WorkflowStatusContext.Provider>
	);

};

export const useWorkflowContext = ()=> useContext(WorkflowStatusContext);
