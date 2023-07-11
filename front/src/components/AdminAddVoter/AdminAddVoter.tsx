"use client";
import { Button, Input, useToast } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useVoterContext } from '@/context/voter';
import { Address } from 'viem';

export default function AdminAddVoter() {

	const [address, setAddress] = useState<Address>('' as Address);
	const { voters, addNewVoter } = useVoterContext();
	const toast = useToast();

	let nbVoters = voters.length;
	useEffect(() => {
		if(voters.length != nbVoters) {
			nbVoters = voters.length;
			toast({
				title: 'Success !',
				description: "Voter is registered !",
				status: 'success',
				duration: 4500,
				isClosable: true,
				position: 'top',
			});
		}
    },[voters])

	// HELPER
	const ErrorToast = (msg: string) => {
		toast({
			title: 'Error.',
			description: msg,
			status: 'error',
			duration: 4500,
			isClosable: true,
		});
	}

	// EVENT
	const handleChange = (e: any) => {
		setAddress(e.target.value as Address);
	};

	const addVoterAddress = async () => {
		const voterAddress = address || "";
		if (!/^0x[a-fA-F0-9]{40}$/.test(voterAddress)) {
			ErrorToast("Incorrect Eth Address !");
			return;
		}
		const found = voters.some(
			({ address: addr }) => addr === voterAddress
		);

		setAddress('' as Address);

		if (found) {
			ErrorToast("Address already registered !");
		} else {
			toast({ description: 'Transaction in progress...' });
			try {
				await addNewVoter(voterAddress);
			}catch(error) {
				ErrorToast((error as Error).message);
			}
		};
	};

	return (
		<>
			<Input placeholder='Ethereum address...' width='66%' id="addressToAdd"
				onChange={handleChange}
				value={address as string}
				marginRight="1rem"
				name="inputAddr"
			/>
			<Button
				leftIcon={<AddIcon />}
				onClick={() => addVoterAddress()}
				colorScheme='blue'
				variant='solid'
				aria-label='Add New Voter'
				isDisabled={!address.length}
			>
				Add New Voter
			</Button>

		</>
	);
}