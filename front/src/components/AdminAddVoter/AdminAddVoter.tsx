"use client";
import { IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useVoterContext } from '@/context/voter';
import { useToast } from '@chakra-ui/react';
import { useContract } from '@/context/contract';
import { Address } from 'viem';


export default function AdminAddVoter() {

	const [address, setAddress] = useState<Address>("0x" as Address);
	const { voters, setVoters } = useVoterContext();
	const toast = useToast();
	const { addVoter, isAlreadyRegistred,getVoter } = useContract();

	const ErrorToast = (msg: string) => {
		toast({
			title: 'Error.',
			description: msg,
			status: 'error',
			duration: 4500,
			isClosable: true,
		});
	}

	const addVoterAddress = () => {

		if (address.length !== 42) { ErrorToast("Incorrect Eth Address !"); return; }
		if (address.startsWith("0x")) { ErrorToast("Incorrect Eth Address !"); return; }

		// Addresses are uniques
		const found = voters.some(
			({ address: addr }) => addr.toLowerCase() === address.toLowerCase()
		);
		if (found) {
			ErrorToast("Address already registered !");
		}else {
			toast({ description: 'Transaction in progress...' });
			getApiAddVoter();
		};
	};

	const getApiAddVoter = async () => {
		
		const registered = isAlreadyRegistred(address);
		if(!registered) {
			await addVoter(address);
		}
		const voter = await getVoter(address);

		setVoters([...voters, voter]);

		toast({
			title: 'Success !',
			description: "Voter is registered !",
			status     : 'success',
			duration   : 4500,
			isClosable : true,
			position   : 'top',
		});

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