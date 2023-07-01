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

/*
0x99048293FA822B1C610979122BB987F072a62CcA
0x1e3F30A3715D00A91de8dd819ceB75c444CDFD6D
0xE82a021e583e2826488611b01CFe870ee051b9ac
*/
	const addVoterAddress = () => {

		if( address.length !== 42) { ErrorToast("Incorrect Eth Address !"); return;}
		if( address.slice(0,2) !== "0x") { ErrorToast("Incorrect Eth Address !"); return;}

		// Addresses are uniques
		/*
		for( let i=0 ;i < voters.length; i++ ) {
			if( voters[i].toLowerCase() !== address.toLowerCase()) { continue;}
			ErrorToast("Address already registered !");
			return;
		}*/

		setVoters( [...voters, address]);

		toast({
			title      : 'Success !',
			description: "Voter is registered !",
			status     : 'success',
			duration   : 4500,
			isClosable : true,
		});

	};
	
	// https://chakra-ui.com/docs/components/button
	// https://chakra-ui.com/docs/components/icon
	// https://chakra-ui.com/docs/components/input
	// https://chakra-ui.com/docs/components/flex
	return (
	<Flex width="100%">
		<ButtonGroup isAttached colorScheme='blue'>
			<IconButton onClick={ e=> addVoterAddress(e)} aria-label='Add New Voter' icon={<AddIcon />} />
			<Button onClick={ ()=> addVoterAddress(e)}>Add New Voter</Button>
		</ButtonGroup>
		<Input placeholder='Ethereum address...' width='auto' id="addressToAdd"
			onChange={e => setAddress(e.target.value)}
		/>
	</Flex>
  );
}