"use client"

import { Container } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';

import ProposalsAdd from '../ProposalsAdd/ProposalsAdd';
import ProposalsList from '../ProposalsList/ProposalsList';

export default function ProposalsTab() {
  return (
    <Container>
      <ProposalsAdd />
      <Divider orientation='vertical' height='10px' />
      <ProposalsList />
    </Container>
  )
}