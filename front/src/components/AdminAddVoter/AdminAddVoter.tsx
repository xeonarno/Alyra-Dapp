"use client";
import { IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useVotersContext } from '@/context/voters';
import { useToast } from '@chakra-ui/react';


export default function AdminAddVoter() {

	const [address, setAddress] = useState("");
	const {voters,  setVoters}  = useVotersContext();
	const toast = useToast();

/*
0xE82a021e583e2826488611b01CFe870ee051b9ac
*/
	const addVoterAddress = () => {

		if( address.length !== 42) { return;}
		if( address.slice(0,2) !== "0x") { return;}

		// Addresses are uniques
		/*
		for( let i=0 ;i < voters.length; i++ ) {
			if( voters[i].toLowerCase() !== address.toLowerCase()) { continue;}
			toast({
				title      : 'Error.',
				description: "Address already registered !",
				status     : 'error',
				duration   : 4000,
				isClosable : true,
			});
			return;
		}*/

		setVoters( [...voters, address]);
		//console.log( "[ADD] "+voters);
		toast({
			title      : 'Success !',
			description: "Voter is registered !",
			status     : 'success',
			duration   : 4000,
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
			<IconButton aria-label='Add New Voter' icon={<AddIcon />} />
			<Button onClick={ ()=> addVoterAddress()}>Add New Voter</Button>
		</ButtonGroup>
		<Input placeholder='Ethereum address...' width='auto' id="addressToAdd"
			onChange={e => setAddress(e.target.value)}
		/>
	</Flex>
  );
}