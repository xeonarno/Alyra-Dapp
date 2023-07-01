"use client"
import Layout from "@/components/Layout/Layout";
import AdminTab from "@/components/AdminTab/AdminTab";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { Text } from "@chakra-ui/react";
import { VStack, Box } from "@chakra-ui/react";
import { useWorkflowContext } from '@/context/workflow';

import { IconButton } from '@chakra-ui/react';
import { ArrowRightIcon, CloseIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'


export default function Home() {

  const {workflowStatus,  setWorkflowStatus}  = useWorkflowContext();

  const disp:string = [
    "RegisteringVoters",
    "ProposalsRegistrationStarted",
    "ProposalsRegistrationEnded",
    "VotingSessionStarted",
    "VotingSessionEnded",
    "VotesTallied"
  ];

  const toast = useToast();


  const nextStep = () => {
    if( workflowStatus >= 5) {
        toast({
          title      : 'NO',
          description: 'Votes are tallied',
          status     : 'error',
          duration   : 4500,
          isClosable : true,
        });
        return;
    }

    setWorkflowStatus( workflowStatus+1);
    //console.log(workflowStatus);
  };



  // https://chakra-ui.com/docs/components/tabs/usage
  // https://chakra-ui.com/docs/components/stepper/usage
  return (
    <Layout>
      <VStack>
        <Text fontSize='2xl' as="b" >
          <ButtonGroup  colorScheme={( workflowStatus >= 5)? 'red': 'blue'}>
            <Button width='450px' onClick={ ()=> nextStep()}>{ disp[workflowStatus] }</Button>
            <IconButton onClick={ ()=> nextStep()} aria-label='Next Step' icon={( workflowStatus < 5)? <ArrowRightIcon /> : <CloseIcon /> } />
          </ButtonGroup>
        </Text>

        <Box>
          <Tabs size='lg'>
            <TabList>
              <Tab>Admin</Tab>
              {( workflowStatus == 1 )? <Tab>Proposals</Tab>: <Tab isDisabled>Proposals</Tab>}
              {( workflowStatus == 3 )? <Tab>Votes</Tab>: <Tab isDisabled>Votes</Tab>}
              {( workflowStatus >= 5 )? <Tab>Result</Tab>: <Tab isDisabled>Result</Tab>}
            </TabList>

            <TabPanels>
              <TabPanel>
                <Text fontSize='2xl' as="b">Administration Page</Text>
                <Divider orientation='vertical' height='10px' />
                <AdminTab />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
              <TabPanel>
                <p>four!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </Layout>
  )
}
