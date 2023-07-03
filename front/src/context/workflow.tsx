"use client";
import WorkflowStatus from "@/enum/WorkflowStatus";
import React, { createContext, useContext, useState } from "react";


type WorkflowStatusContextType = {
	workflowStatus:WorkflowStatus,
	setWorkflowStatus: React.Dispatch<React.SetStateAction<WorkflowStatus>>,
}

const WorkflowStatusContext = createContext<WorkflowStatusContextType>({
	workflowStatus:WorkflowStatus.RegisteringVoters,
	setWorkflowStatus:()=>{},
});

export const WorkflowStatusContextProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {

	const [workflowStatus, setWorkflowStatus] = useState<WorkflowStatus>(WorkflowStatus.RegisteringVoters);

	return(
		<WorkflowStatusContext.Provider value={{workflowStatus, setWorkflowStatus}}>
			{ children }
		</WorkflowStatusContext.Provider>
	);

};

export const useWorkflowContext = ()=> useContext(WorkflowStatusContext);
