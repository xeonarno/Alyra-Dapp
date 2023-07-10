"use client";
import { Heading, Badge, Box, Text } from '@chakra-ui/react';

export default function AdminCardVoter({ num, address, last = false }: any) {
	return (
		<Box>
			<Heading size='xs' >
				Voter #{num} {last && <Badge ml='1' fontSize='0.8em' colorScheme='green'>New</Badge>}
			</Heading>
			<Text pt='2' fontSize='sm'>
				⟠ {address}
			</Text>
		</Box>
	);
}