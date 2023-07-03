"use client"

import { Container } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

import { useState } from 'react';

import { useGlobalContext } from '@/context/global';
import { useWorkflowContext } from '@/context/workflow';
import { useProposalContext } from '@/context/proposals';

export default function VotesTab() {

	const {voters,  setVoters}  = useGlobalContext();
  const {workflowStatus,  setWorkflowStatus}  = useWorkflowContext();
	const [voterIndex, setVoterIndex] = useState("");
	const [proposalIndex, setProposalIndex] = useState("");
	const {proposals,  setProposals}  = useProposalContext();

  const toast = useToast();

  const vote = () => {
		toast({ description: 'Transaction in progress...' });
		delay(1500).then(() => {
			getApiVote();
		});
	};

	function delay(ms:number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	const getApiVote = () => {

    // TODO

		toast({
			title      : 'Success !',
			description: "Vote is recorded",
			status     : 'success',
			duration   : 4500,
			isClosable : true,
		});

	}

  return (
    <Container>
      <Select width='100%' placeholder='Select a Voter'
        isDisabled={(workflowStatus == 3)? false: true}
        onChange={e => setVoterIndex(e.target.value)}
      >
      ({
        voters.map((voter,i)=>
          <option key={i} value={i} >⟠ {voter.address}</option>
        )
      })
      </Select>

      <Divider orientation='vertical' height='10px' />
      {/* (workflowStatus == 3)? <ProposalsList />: <></> */}

      <Select width='100%' placeholder='Select a Proposal'
        isDisabled={(workflowStatus == 3)? false: true}
        onChange={e => setProposalIndex(e.target.value)}
      >
      ({
        proposals.map((p,i)=>
          <option key={i} value={i} >👉 {p.description}</option>
        )
      })
      </Select>

      <Divider orientation='horizontal' height='10px' />

			<Button onClick={ ()=> vote()} colorScheme='blue' width='100%' isDisabled={(workflowStatus == 3)? false: true} >VOTE</Button>

    </Container>
  )
}