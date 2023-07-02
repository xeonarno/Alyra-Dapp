"use client"
import Layout from "@/components/Layout/Layout";
import AdminTab from "@/components/AdminTab/AdminTab";
import ProposalsTab from "@/components/ProposalsTab/ProposalTabs";
import VotesTab from "@/components/Vote.tsx/VotesTab";

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

import { Address, useAccount, usePrepareContractWrite, usePublicClient } from 'wagmi';
import { prepareWriteContract, writeContract, readContract } from '@wagmi/core';
import Contract from '../../public/Voting.json';

import WorkflowStatus from "@/enum/WorkflowStatus";
import { waitForTransactionReceipt } from "viem/dist/types/actions/public/waitForTransactionReceipt";


export default function Home() {


  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const { isConnected } = useAccount();

  // const setFavoriteNumber = async () => {
  //   try {
  //     const { request } = await prepareWriteContract({
  //       address: contractAddress,
  //       abi: Contract.abi,
  //       functionName: "setNumber",
  //       args: [number]
  //     });
  //     const { hash } = await writeContract(request);
  //     await getDatas()
  //     return hash;
  //   } catch (err: any) {
  //     console.log(err.message)
  //   }
  // }

  // const getDatas = async () => {
  //   try {
  //     const data = await readContract({
  //       address: contractAddress,
  //       abi: Contract.abi,
  //       functionName: "getNumber",
  //     }) as Numeric;
  //     console.log({ data });
  //     setGetNumber(data.toString())
  //   } catch (err: any) {
  //     console.log(err.message)
  //   }
  // }

  // const { config } = usePrepareContractWrite({
  //   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  //   abi: [
  //     {
  //       name: 'mint',
  //       type: 'function',
  //       stateMutability: 'nonpayable',
  //       inputs: [],
  //       outputs: [],
  //     },
  //   ],
  //   functionName: 'mint',
  // })
  // const { data, write } = useContractWrite(config)

  // const { isLoading, isSuccess } = useWaitForTransaction({
  //   hash: data?.hash,
  // })

  const publicClient = usePublicClient();
  const { address } = useAccount();

  const isAlreadyRegistred = async (address: Address | undefined): Promise<boolean> => {
    try {

      console.log(`Ask for address : ${address}`);
      const registered = await readContract({
        address: contractAddress,
        abi: Contract.abi,
        functionName: "getVoter",
        args: [address]
      }) as String;
      console.log('registered', { registered })

      return !!registered;

    } catch (error) {
      return false;
    }
  }

  const getWorkflow = async () => {
    try {

      const data = await readContract({

        address: contractAddress,
        abi: Contract.abi,
        functionName: "workflowStatus",
      }) as WorkflowStatus;
      console.log('workflowStatus', { data });


      const registered = await isAlreadyRegistred(address);

      if(!registered){
        const config = await prepareWriteContract({
          address: contractAddress,
          abi: Contract.abi,
          functionName: "addVoter",
          args: [address]
        });
        console.log('order', { config });

        const { hash } = await writeContract(config);
        console.log('hash', { hash });
        // Check
        const registered = await isAlreadyRegistred(address);
        if(!registered) {
          console.error('Problem with registration ! ');
        }
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isConnected) {
      getWorkflow();
    }
  }, [isConnected])


  ///////////////////////////////////////////////

  const toast = useToast();

  const { workflowStatus, setWorkflowStatus } = useWorkflowContext();

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
		delay(1500).then(() => {
			getAPiNextStep();
		});
    //setWorkflowStatus(workflowStatus + 1);
    //console.log(workflowStatus);
  };

	function delay(ms:number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}


	const getAPiNextStep = () => {

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
                <p>Result</p>
              </TabPanel>

            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </Layout>
  )
}
