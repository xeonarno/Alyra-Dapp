"use client"

import { useCallback, useEffect, useState } from "react";
import { ArrowRightIcon, CloseIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, IconButton, useToast } from '@chakra-ui/react';

import ProposalsTab from "@/components/ProposalsTab/ProposalTabs";
import VotesTab from "@/components/Vote.tsx/VotesTab";
import ResultTab from "@/components/ResultTab/ResultTab";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { Text } from "@chakra-ui/react";
import { VStack, Box } from "@chakra-ui/react";

import WorkflowStatus from "@/enum/WorkflowStatus";

import { useWorkflowContext } from '@/context/workflow';

const VoterPage = () => {

    const toast = useToast();
    const { workflowStatus, setWorkflowStatus } = useWorkflowContext();
    ///////////////////////////////////////////////


    const disp: string[] = [
        "RegisteringVoters",
        "ProposalsRegistrationStarted",
        "ProposalsRegistrationEnded",
        "VotingSessionStarted",
        "VotingSessionEnded",
        "VotesTallied"
    ];

    const idx: number[] = [0, 1, 1, 2, 2, 3];




    // https://chakra-ui.com/docs/components/tabs/usage
    // https://chakra-ui.com/docs/components/stepper/usage

    return (
        <VStack>
            <Box>
                <Tabs size='lg' index={idx[workflowStatus]}>
                    <TabList>
                        <Tab isDisabled={workflowStatus !== 1}>Proposals</Tab>
                        <Tab isDisabled={workflowStatus !== 3}>Votes</Tab>
                        <Tab isDisabled={workflowStatus < 5}>Result</Tab>
                    </TabList>

                    <TabPanels>
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
    );
};


export default VoterPage;