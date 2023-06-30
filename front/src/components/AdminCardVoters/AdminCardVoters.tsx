"use client";
import { Flex } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { Stack, StackDivider } from '@chakra-ui/react';
import AdminCardVoter from '../AdminCardVoter/AdminCardVoter';
import { useEffect } from 'react';

import { useVotersContext } from '@/context/voters';

export default function AdminCardVoters() {

	const { voters }  = useVotersContext();

	var rows = [];

	/*
	for( let i = 0; i < voters.length; i++) {
		rows.push( <AdminCardVoter key={i} num={i+1} address={voters[i]} /> );
	}
	console.log( "B "+voters);
	*/
	
	useEffect(()=>{
		rows = [];
		for( let i = 0; i < voters.length; i++) {
			rows.push( <AdminCardVoter key={i} num={i+1} address={voters[i]} /> );
		}
		console.log( "[LIST] "+voters);
		console.log( "[LIST] "+rows);
	},[voters]);
	

	return (
		<Flex>
			<Card width="100%">
			<CardHeader>
				<Heading size='md'>Registered voters</Heading>
			</CardHeader>

			<CardBody>
				<Stack divider={<StackDivider />} spacing='4'>
				{
				/*rows*/
				voters.map((voter,i)=> {<AdminCardVoter key={i} num={i+1} address={voter} />})
				}
				</Stack>
			</CardBody>
			</Card>

		</Flex>
	);
}

/*
			<AdminCardVoter num={"1"} address={"0x99048293FA822B1C610979122BB987F072a62CcA"} />
			<AdminCardVoter num={"2"} address={"0x1e3F30A3715D00A91de8dd819ceB75c444CDFD6D"} />
			<AdminCardVoter num={"3"} address={"0xE82a021e583e2826488611b01CFe870ee051b9ac"} />

0x99048293FA822B1C610979122BB987F072a62CcA
0x1e3F30A3715D00A91de8dd819ceB75c444CDFD6D
0xE82a021e583e2826488611b01CFe870ee051b9ac

*/