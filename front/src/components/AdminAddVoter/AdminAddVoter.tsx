"use client";
import { Button, ButtonGroup, Input, Flex, useToast, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useVoterContext } from '@/context/voter';
import { useContract } from '@/context/contract';
import { Address, ContractFunctionExecutionError } from 'viem';
import Voter from '@/type/Voter';
import VoterEvent from '@/type/VoterEvent';

export default function AdminAddVoter() {

	const [address, setAddress] = useState<Address>("0x" as Address);
	const { voters, setVoters } = useVoterContext();
	const toast = useToast();
	const { addVoter, listenVoterRegistered } = useContract();

	const onVoterRegistered = (event: VoterEvent) => {
		console.log('Voter ::: ', event);

		const { args: { voterAddress } } = event;
		console.log({ voterAddress });
		registeredVoter(voterAddress);
	}

	const registeredVoter = (address: Address) => {
		const voter: Voter = {
			address,
			votedProposalId: 0,
			hasVoted: false,
			dirty: true,
		}

		// Addresses are uniques
		const found = voters.some(
			({ address: addr }) => addr.toLowerCase() === address.toLowerCase()
		);
		if (!found) {

			setVoters([...voters, voter]);

			toast({
				title: 'Success !',
				description: "Voter is registered !",
				status: 'success',
				duration: 4500,
				isClosable: true,
				position: 'top',
			});

		}
	}
	useEffect(() => {
		const unSubscribe = listenVoterRegistered(onVoterRegistered);
		return () => unSubscribe();
	}, [])

	const ErrorToast = (msg: string) => {
		toast({
			title: 'Error.',
			description: msg,
			status: 'error',
			duration: 4500,
			isClosable: true,
		});
	}

	const addVoterAddress = async () => {

		if (address.length !== 42 || !address.startsWith("0x")) {
			ErrorToast("Incorrect Eth Address !");
			return;
		}

		// Addresses are uniques
		const found = voters.some(
			({ address: addr }) => addr.toLowerCase() === address.toLowerCase()
		);
		if (found) {
			ErrorToast("Address already registered !");
		} else {
			toast({ description: 'Transaction in progress...' });
			await getApiAddVoter();
		};
	};

	const getApiAddVoter = async () => {
		try {
			try {
				await addVoter(address);
			} catch (error) {
				const { details = "" } = error as ContractFunctionExecutionError;
				if (details.includes('Already registered')) {
					registeredVoter(address);
				} else {
					throw error;
				}
			}
		} catch (error: any) {
			console.error(error);
			ErrorToast((error as Error).message);
		}
	}

	// https://chakra-ui.com/docs/components/button
	// https://chakra-ui.com/docs/components/icon
	// https://chakra-ui.com/docs/components/input
	// https://chakra-ui.com/docs/components/flex
	return (
		<Flex width="100%">
			<ButtonGroup isAttached colorScheme='blue'>
				<IconButton onClick={() => addVoterAddress()} aria-label='Add New Voter' icon={<AddIcon />} />
				<Button onClick={() => addVoterAddress()}>Add New Voter</Button>
			</ButtonGroup>
			<Input placeholder='Ethereum address...' width='auto' id="addressToAdd"
				onChange={e => setAddress(e.target.value as Address)}
			/>
		</Flex>
	);
}