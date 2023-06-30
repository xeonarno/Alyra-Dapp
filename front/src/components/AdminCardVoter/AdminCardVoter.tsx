"use client";
import { Heading } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

export default function AdminCardVoter( { num, address }) {
  return (
	<>
		<Box>
			<Heading size='xs' textTransform='uppercase'>
			Voter #{ num }
			</Heading>
			<Text pt='2' fontSize='sm'>
			⟠ { address }
			</Text>
		</Box>
	</>
  );
}