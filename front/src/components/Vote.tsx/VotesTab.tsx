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

  const vote = () => {
    // TODO
	};

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

			<Button onClick={ e=> vote(e)} colorScheme='blue' width='100%' isDisabled={(workflowStatus == 3)? false: true} >VOTE</Button>

    </Container>
  )
}