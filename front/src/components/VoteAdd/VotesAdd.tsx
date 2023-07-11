"use client"

import { Button, Card, CardBody, CardHeader, Center, Divider, Heading, Select, Spinner, Text } from '@chakra-ui/react';
import { CheckCircleIcon, CheckIcon, WarningIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';

import { ChangeEvent, useEffect, useState } from 'react';

import { useAccount } from 'wagmi';
import { useVoterContext } from '@/context/voter';
import { useWorkflowContext } from '@/context/workflow';
import { useVoteContext } from '@/context/vote';
import { useProposalContext } from '@/context/proposal';

export default function VoteAdd() {

	const { address } = useAccount();
	const { isVoter, checkVoterStatus } = useVoterContext();
	const { addNewVote, hasVoted } = useVoteContext();
	const { nextStep, isLoading } = useWorkflowContext();
	const { proposals, requireProposals, isLoading: loadProposals } = useProposalContext();
	const [proposalIndex, setProposalIndex] = useState(0);
	const [proposal, setProposal] = useState('');

	const [next, setnext] = useState(false);

	const toast = useToast();

	useEffect(() => {
		if (hasVoted) {
			toast({
				title: 'Success',
				description: 'Vote done !',
				status: 'success',
				duration: 4500,
				isClosable: true,
			});
		}
	}, [hasVoted]);

	useEffect(() => {
		if (!isVoter) {
			onVoterStatus();
		}
	}, [isVoter])

	const onNext = ()=> {
		setnext(true);
	}

	const onVoterStatus = () => {
		checkVoterStatus();
	}

	useEffect(() => {
		try{
			checkVoterStatus();
			console.log('hasVoted ', hasVoted);
			handleProposals();
		}catch(error){
			console.error(error);
		}
	}, []);

	const handleProposals = () => {
		console.log('[[VotePage]]:', proposals);
		if (!proposals.length) {
			requireProposals();
		}
	}

	const handleValidation = () => {
		console.log("[[VotePage]]: validation !");
		nextStep();
	}

	const onSelectProposal = (e: ChangeEvent<HTMLSelectElement> | null) => {
		const index = e?.target?.selectedIndex || -1;
		setProposalIndex(index);
		if (index >= 0) {
			const { description } = proposals[index];
			setProposal(description);
		}
	}

	const onVote = async () => {
		await addNewVote(proposalIndex);
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
				<Heading size='md' onClick={onNext}>Vote:</Heading>
				<Text pt='2' fontSize='sm'>⟠ {address}  {isVoter ? <CheckCircleIcon /> : <WarningIcon onClick={onVoterStatus} />}</Text>
			</CardHeader>
			<CardBody>
				{hasVoted || next ?
					<>
						<Center>
							<Text>votre vote : {proposal} </Text>
						</Center>
						<Divider orientation='vertical' height='10px' />
						<Center>
							<Button
								leftIcon={<CheckIcon />}
								onClick={handleValidation}
								colorScheme='blue'
								variant='solid'
								aria-label='Vote !'
							>
								Close the vote...
							</Button>
						</Center>
					</> :
					<>
						{loadProposals ?
							<Spinner
								thickness='4px'
								speed='0.65s'
								emptyColor='gray.200'
								color='blue.500'
								size='xl'
							/>
							:
							<Select width='100%' placeholder='Select a Proposal' onClick={handleProposals} onChange={onSelectProposal}>
								({
									proposals.map((p, i) =>
										<option key={i} value={i} >👉 {p.description}</option>
									)
								})
							</Select>
						}
						<Divider orientation='vertical' height='10px' />
						<Button
							leftIcon={<CheckIcon />}
							onClick={onVote}
							colorScheme='blue'
							variant='solid'
							aria-label='Vote !'
							isDisabled={proposalIndex < 0 || hasVoted}
						>
							Vote !
						</Button>
					</>
				}
			</CardBody>
		</Card>
	}
	</>
}