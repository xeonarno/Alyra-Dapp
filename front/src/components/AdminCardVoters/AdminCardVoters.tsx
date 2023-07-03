"use client";
import { Flex } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { Stack, StackDivider } from '@chakra-ui/react';
import AdminCardVoter from '../AdminCardVoter/AdminCardVoter';

import { useVotersContext } from '@/context/voters';

export default function AdminCardVoters() {

	const { voters }  = useVotersContext();

	return (
		<Flex>
			<Card width="100%">
			<CardHeader>
				<Heading size='md'>Registered voters</Heading>
			</CardHeader>

			<CardBody>
				<Stack divider={<StackDivider />} spacing='4'>
				({
				voters.map((voter,i)=> <AdminCardVoter key={i} num={i+1} address={voter} />)
				})
				</Stack>
			</CardBody>
			</Card>

		</Flex>
	);
}

/*

0x99048293FA822B1C610979122BB987F072a62CcA
0x1e3F30A3715D00A91de8dd819ceB75c444CDFD6D
0xE82a021e583e2826488611b01CFe870ee051b9ac

*/