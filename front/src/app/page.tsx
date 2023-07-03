"use client"
import Layout from "@/components/Layout/Layout";
import AdminTab from "@/components/AdminTab/AdminTab";
import ProposalsTab from "@/components/ProposalsTab/ProposalTabs";
import VotesTab from "@/components/Vote.tsx/VotesTab";
import ResultTab from "@/components/ResultTab/ResultTab";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { Text } from "@chakra-ui/react";
import { VStack, Box } from "@chakra-ui/react";

import { useWorkflowContext } from '@/context/workflow';

import { IconButton } from '@chakra-ui/react';
import { ArrowRightIcon, CloseIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'

import { useCallback, useEffect, useState } from "react";

import { useAccount } from 'wagmi';

import WorkflowStatus from "@/enum/WorkflowStatus";
import { useContract } from "@/context/contract";


export default function Home() {
  const { isConnected } = useAccount();
  const toast = useToast();
  const { workflowStatus, setWorkflowStatus } = useWorkflowContext();
  const { getStatus } = useContract();

  const getWorkflow = async () => {
    // Activate mode admin
  };

  useEffect(() => {
    const reachStatus = async () => {
      const status = await getStatus();
      setWorkflowStatus(status);
    }
    reachStatus();
    
    if (isConnected) {
      getWorkflow();
    }
  }, [isConnected])


  ///////////////////////////////////////////////

  const disp: string[] = [
    "RegisteringVoters",
    "ProposalsRegistrationStarted",
    "ProposalsRegistrationEnded",
    "VotingSessionStarted",
    "VotingSessionEnded",
    "VotesTallied"
  ];

  //const [tabIndex] = useState(0);

  const idx: number[] = [0, 1, 1, 2, 2, 3];

  const nextStep = () => {
    if (workflowStatus >= 5) {
      toast({
        title: 'NO',
        description: 'Votes are tallied',
        status: 'error',
        duration: 4500,
        isClosable: true,
      });
      return;
    }

		toast({ description: 'Transaction in progress...' });
	
			getApiNextStep();
	
    //setWorkflowStatus(workflowStatus + 1);
    //console.log(workflowStatus);
  };



	const getApiNextStep = () => {

    setWorkflowStatus(workflowStatus + 1);
    //console.log(workflowStatus);

		toast({
			title      : 'Success !',
			description: disp[workflowStatus+1],
			status     : 'success',
			duration   : 4500,
			isClosable : true,
		});

	}
  // https://chakra-ui.com/docs/components/tabs/usage
  // https://chakra-ui.com/docs/components/stepper/usage
  return (
    <Layout>
      <VStack>
        <Text fontSize='2xl' as="b" >
          <ButtonGroup  colorScheme={( workflowStatus >= 5)? 'red': 'blue'}>
            <Button width='450px' onClick={ ()=> nextStep()}>{ disp[workflowStatus] } </Button>
            <IconButton onClick={ ()=> nextStep()} aria-label='Next Step' icon={( workflowStatus < 5)? <ArrowRightIcon /> : <CloseIcon /> } />
          </ButtonGroup>
        </Text>

        <Box>
          <Tabs size='lg' index={idx[workflowStatus]}>
            <TabList>
              {(workflowStatus <= 0) ? <Tab>Registration</Tab> : <Tab isDisabled>Registration</Tab>}
              {(workflowStatus == 1) ? <Tab>Proposals</Tab> : <Tab isDisabled>Proposals</Tab>}
              {(workflowStatus == 3) ? <Tab>Votes</Tab> : <Tab isDisabled>Votes</Tab>}
              {(workflowStatus >= 5) ? <Tab>Result</Tab> : <Tab isDisabled>Result</Tab>}
            </TabList>

            <TabPanels>

              <TabPanel>
                <Text fontSize='2xl' as="b">Voters Registration</Text>
                <Divider orientation='vertical' height='10px' />
                <AdminTab />
              </TabPanel>

              <TabPanel>
                <Text fontSize='2xl' as="b">Proposals Registration</Text>
                <Divider orientation='vertical' height='10px' />
                <ProposalsTab />
              </TabPanel>

              <TabPanel>
                <Text fontSize='2xl' as="b">Vote !</Text>
                <Divider orientation='vertical' height='10px' />
                <VotesTab />
              </TabPanel>

              <TabPanel>
                <Text fontSize='2xl' as="b">Result</Text>
                <Divider orientation='vertical' height='10px' />
                <ResultTab />
              </TabPanel>

            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </Layout>
  )
}
