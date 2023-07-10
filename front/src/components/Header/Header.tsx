"use client"
import React, { useEffect } from "react";
import { Button, Flex, Text, Image, Stepper, useSteps, Step, StepIndicator, StepStatus, StepIcon, StepNumber, Box, StepTitle, StepDescription, StepSeparator } from "@chakra-ui/react"

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from 'next/navigation';
import { useWorkflowContext } from "@/context/workflow";
import WorkflowStatus from "@/enum/WorkflowStatus";

const PATHS: Record<WorkflowStatus, string> = {
	[WorkflowStatus.RegisteringVoters]: '/voter',
	[WorkflowStatus.ProposalsRegistrationStarted]: '/proposal',
	[WorkflowStatus.ProposalsRegistrationEnded]: '/setup',
	[WorkflowStatus.VotingSessionStarted]: '/vote',
	[WorkflowStatus.VotingSessionEnded]: '/closed',
	[WorkflowStatus.VotesTallied]: '/tally'
}

const Header = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  const { workflowStatus } = useWorkflowContext();

  const steps = [
    { title: 'Voters', description: 'voters registration' },
    { title: 'Proposal', description: 'Proposal registration' },
    { title: 'Vote', description: 'Voted !' },
    { title: 'Résultats', description: 'Who wins !' },
  ]

  const mappingIndex = [0, 1, 1, 2, 2, 3];

  const { activeStep } = useSteps({
    index: mappingIndex[workflowStatus],
    count: steps.length,
  });

  // Disconnect
  useEffect(() => {
    if (!isConnected) {
      router.replace('/');
    }else {
      getCurrentPage();
    }
  }, [isConnected, workflowStatus]);


  const getCurrentPage = (workflow?: WorkflowStatus) => {
		const status:WorkflowStatus = workflow !== undefined ? workflow : workflowStatus;
		console.log('[[getCurrentPage]]: ', WorkflowStatus[status]);

		const url: string = PATHS[status] || '/';

		console.log('[[[getCurrentPage]]]: ', url);
		router.push(url);
	}


  return (
    <>
      <Flex
        paddingLeft="1rem"
        paddingRight="1rem"
        paddingBottom="1rem"
        paddingTop="0.1rem"
        justifyContent="space-between"
        alignItems="center"
      >
        <Image src='logo.png' h='50%' alt='Vote !' />
        {isConnected && <ConnectButton />}
      </Flex>
      {
        isConnected && <Flex
          paddingLeft="1rem"
          paddingRight="1rem"
          paddingBottom="1rem"
          paddingTop="0.1rem"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stepper index={activeStep} w="100%">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink='0'>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Flex>
      }
    </>
  );
}
export default Header
