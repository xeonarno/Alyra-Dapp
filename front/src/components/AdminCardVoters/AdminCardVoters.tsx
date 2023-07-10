"use client";
import { Flex } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { Stack, StackDivider } from '@chakra-ui/react';
import AdminCardVoter from '../AdminCardVoter/AdminCardVoter';

import { useVoterContext } from '@/context/voter';

export default function AdminCardVoters() {

	const { voters } = useVoterContext();

	return (
		<Flex>
			<Card width="100%">
				<CardHeader>
					<Heading size='md'>Registered voters</Heading>
				</CardHeader>
				<CardBody>
					<Stack divider={<StackDivider />} spacing='4'>
						({
							voters.map(({ address }, i,{ length } ) => {
								return <AdminCardVoter key={i} num={i + 1} address={address} last={length===i+1} />
							})
						})
					</Stack>
				</CardBody>
			</Card>

		</Flex>
	);
}
