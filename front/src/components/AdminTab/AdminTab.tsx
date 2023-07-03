"use client";
import AdminAddVoter   from '../AdminAddVoter/AdminAddVoter';
import AdminCardVoters from '../AdminCardVoters/AdminCardVoters';
import { Container } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';

export default function AdminTab() {
	// https://chakra-ui.com/docs/components/box
  return (
    <Container>
		<AdminAddVoter />
		<Divider orientation='vertical' height='10px' />
		<AdminCardVoters />
    </Container>
  );
}