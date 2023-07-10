"use client";
import WorkflowStatus from "@/enum/WorkflowStatus";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useContract } from "./contract";

import {
	endProposalsRegistering,
	endVotingSession,
	startProposalsRegistering,
	startVotingSession,
	tallyVotes
} from "./contract/voting";

import StatusEvent from "@/type/StatusEvent";


type WorkflowStatusContextType = {
	workflowStatus: WorkflowStatus,
	nextStep(): void,
	isLoading: boolean,
}

const WorkflowStatusContext = createContext<WorkflowStatusContextType>({
	workflowStatus: WorkflowStatus.RegisteringVoters,
	nextStep: () => { },
	isLoading: false,
});

const STATUS_METHODS = {
	[WorkflowStatus.RegisteringVoters]: startProposalsRegistering,
	[WorkflowStatus.ProposalsRegistrationStarted]: endProposalsRegistering,
	[WorkflowStatus.ProposalsRegistrationEnded]: startVotingSession,
	[WorkflowStatus.VotingSessionStarted]: endVotingSession,
	[WorkflowStatus.VotingSessionEnded]: tallyVotes,
}

export const WorkflowStatusContextProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
	console.log('[[WorkflowStatusContextProvider]]: INIT !');
	const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatus>(WorkflowStatus.RegisteringVoters);
	const { getStatus, listenStatusChanged } = useContract();
	const [isLoading, setLoading] = useState(false);

	const onStatusChanged = async (event : StatusEvent) => {
		console.log('[onStatusChanged]', event);
		const status = await updateWorkflowStatus();
	}

	const updateWorkflowStatus = async () => {
		const status = await getStatus();
		console.log('[[WorkflowStatus > getStatus]]', WorkflowStatus[status]);
		setWorkflowStatus(status);
		setLoading(false);
		return status;
	}

	const nextStep = async () => {
		if (workflowStatus === WorkflowStatus.VotesTallied) {
			throw new Error('Workflow is already done');
		}

		setLoading(true);

		const step = STATUS_METHODS[workflowStatus];
		if (!step) {
			console.error(new Error(`Incorrect Status: ${workflowStatus}`));
			setLoading(false);
		} else {
			await step();
		}
	}

	useEffect(() => {
		const watcher = listenStatusChanged(onStatusChanged);
		setLoading(true);
		updateWorkflowStatus();
		return () => watcher();
	}, [])

	return (
		<WorkflowStatusContext.Provider value={{ workflowStatus, nextStep, isLoading }}>
			{children}
		</WorkflowStatusContext.Provider>
	);

};

export const useWorkflowContext = () => useContext(WorkflowStatusContext);
