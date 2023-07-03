"use client";
import { IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useGlobalContext } from '@/context/global';
import { useToast } from '@chakra-ui/react';


export default function AdminAddVoter() {

	const [address, setAddress] = useState("");
	const {voters,  setVoters}  = useGlobalContext();
	const toast = useToast();

	const ErrorToast = ( msg:string ) => {
		toast({
			title      : 'Error.',
			description: msg,
			status     : 'error',
			duration   : 4500,
			isClosable : true,
		});
	}

	const addVoterAddress = () => {

		if( address.length !== 42) { ErrorToast("Incorrect Eth Address !"); return;}
		if( address.slice(0,2) !== "0x") { ErrorToast("Incorrect Eth Address !"); return;}

		// Addresses are uniques
		for( let i=0 ;i < voters.length; i++ ) {
			if( voters[i].address.toLowerCase() !== address.toLowerCase()) { continue;}
			ErrorToast("Address already registered !");
			return;
		}

		toast({ description: 'Transaction in progress...' });
		delay(1500).then(() => {
			getApiAddVoter();
		});

	};

	function delay(ms:number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	const getApiAddVoter = () => {

		setVoters( [...voters, {
			hasVoted       : false,
			votedProposalId: 0,
			address        : address
		}]);

		toast({
			title      : 'Success !',
			description: "Voter is registered !",
			status     : 'success',
			duration   : 4500,
			isClosable : true,
			position   : 'top',
		});

	}
	
	return (
	<Flex width="100%">
		<ButtonGroup isAttached colorScheme='blue'>
			<IconButton onClick={ ()=> addVoterAddress()} aria-label='Add New Voter' icon={<AddIcon />} />
			<Button onClick={ ()=> addVoterAddress()}>Add New Voter</Button>
		</ButtonGroup>
		<Input placeholder='Ethereum address...' width='auto' id="addressToAdd"
			onChange={e => setAddress(e.target.value)}
		/>
	</Flex>
  );
}