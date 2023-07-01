"use client"

import { Container } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

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

  const addProposal = () => {
    /*
		if( voterIndex.length <= 0) {
			toast({
				title      : 'NO',
				description: "Select a voter, before propose !",
				status     : 'error',
				duration   : 4500,
				isClosable : true,
			});
			return;
		}
		setProposals( [...proposals, { description:proposalText, voteCount:0}]);
		toast({
			title      : 'Success !',
			description: "Proposal is registered !",
			status     : 'success',
			duration   : 4500,
			isClosable : true,
		});
    */
	};

  return (
    <Container>
      <Select width='100%' placeholder='Select a Voter'
        isDisabled={(workflowStatus == 3)? false: true}
        onChange={e => setVoterIndex(e.target.value)}
      >
      ({
        voters.map((voter,i)=>
          <option key={i} value={i} >⟠ {voter}</option>
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

			<Button onClick={ e=> vote(e)} colorScheme='blue' width='100%' >VOTE</Button>

    </Container>
  )
}