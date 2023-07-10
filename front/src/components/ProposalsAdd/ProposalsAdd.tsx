"use client"

import { Button, Card, CardBody, CardHeader, Center, Divider, Heading, Spinner, Text } from '@chakra-ui/react';
import { AddIcon, CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';

import { Textarea } from '@chakra-ui/react';

import { useEffect, useState } from 'react';

import { useProposalContext } from '@/context/proposal';
import { useAccount } from 'wagmi';
import { useVoterContext } from '@/context/voter';
import AdminValidation from '../AdminValidation/AdminValidation';
import { useWorkflowContext } from '@/context/workflow';
import { useOwnerContext } from '@/context/owner';

export default function ProposalsAdd() {

	const [proposalText, setProposalText] = useState("");

	const { address } = useAccount();
	const { isVoter, checkVoterStatus } = useVoterContext();
	const toast = useToast();
	const { addNewProposal, proposals } = useProposalContext();
	const { nextStep, isLoading } = useWorkflowContext();
	const { isOwner } = useOwnerContext();

	const [activate, setActivate] = useState(false);

	const onTextChanged = (event: any) => {
		const proposal = event.target.value as string;

		setProposalText(proposal);
		setActivate(proposal.length >= 10);
	}

	useEffect(() => {
		toast({
			title: 'Success',
			description: 'New Proposal available',
			status: 'success',
			duration: 4500,
			isClosable: true,
		});
	}, [proposals]);

	useEffect(() => {
		if (!isVoter) {
			onVoterStatus();
		}
	}, [isVoter])

	const onVoterStatus = () => {
		checkVoterStatus();
	}

	const handleValidation = () => {
		console.log("[[VoterPage]]: validation !");
		nextStep();
	}

	return <>{isLoading ? <Center w="100vw">
		<Spinner
			thickness='4px'
			speed='0.65s'
			emptyColor='gray.200'
			color='blue.500'
			size='xl'
		/>
	</Center> :
		<Card width="100%">
			<CardHeader>
				<Heading size='md'>Add new proposal</Heading>
				<Text pt='2' fontSize='sm'>⟠ {address}  {isVoter ? <CheckCircleIcon /> : <WarningIcon onClick={onVoterStatus} />}</Text>
				{isOwner && <AdminValidation question="Close Proposals registration ?" onNext={() => handleValidation()} />}
			</CardHeader>
			<CardBody>
				<Textarea placeholder=''
					onChange={onTextChanged}
				/>
				<Divider orientation='vertical' height='10px' />
				<Button
					leftIcon={<AddIcon />}
					onClick={() => addNewProposal(proposalText)}
					colorScheme='blue'
					variant='solid'
					aria-label='Add new proposal'
					isDisabled={!activate}
				>
					Add new proposal
				</Button>

			</CardBody>
		</Card>
	}
	</>
}