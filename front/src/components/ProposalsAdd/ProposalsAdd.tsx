"use client"

import { Flex } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { Input } from '@chakra-ui/react';

import { Container } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react'

import { useState } from 'react';
import { useGlobalContext } from '@/context/global';

import { useWorkflowContext } from '@/context/workflow';

export default function ProposalsAdd() {

	const {voters,  setVoters}  = useGlobalContext();
	const {workflowStatus,  setWorkflowStatus}  = useWorkflowContext();

	const [voterIndex, setVoterIndex] = useState(-1);
	const [proposalText, setProposalTextVoterIndex] = useState("");


	const addProposal = () => {
	};
/*
0x99048293FA822B1C610979122BB987F072a62CcA
0x1e3F30A3715D00A91de8dd819ceB75c444CDFD6D
0xE82a021e583e2826488611b01CFe870ee051b9ac
*/
  return (

    <Container width='100%'>
		<Select width='100%' placeholder='Select a Voter'
			isDisabled={(workflowStatus == 1)? false: true}
			onChange={e => setVoterIndex(e.target.value)}
		>
		({
			voters.map((voter,i)=>
				<option key={i} value={i} >⟠ {voter}</option>
			)
		})
		</Select>
		<Divider orientation='horizontal' height='10px' />

		<ButtonGroup width='100%' isAttached colorScheme='blue' isDisabled={(workflowStatus == 1)? false: true}>
			<IconButton onClick={ e=> addProposal(e)} aria-label='Add New Proposal' icon={<AddIcon />} />
			<Button onClick={ e=> addProposal(e)}>Add New Proposal</Button>
		</ButtonGroup>
		<Textarea placeholder=''
			isDisabled={(workflowStatus == 1)? false: true}
			onChange={e => setProposalTextVoterIndex(e.target.value)}
		/>

		<Divider orientation='horizontal' height='10px' />

    </Container>


  )
}