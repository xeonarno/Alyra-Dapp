"use client"


import { Flex } from '@chakra-ui/react';
import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { Stack, StackDivider } from '@chakra-ui/react';

import { useProposalContext } from '@/context/proposal';
import ProposalCard from '../ProposalCard/ProposalCard';
import { useEffect } from 'react';

export default function ProposalsList() {

  const { proposals, requireProposals } = useProposalContext();

  useEffect(()=> {
    console.log('[[ProposalsList]]: requireProposals');
    requireProposals();
  }, []);

  const handle = () => {
    console.log('[[ProposalsList]]: Refresh...');
    requireProposals();
  }

  return (
    <Flex
      justifyContent='center'
      w="100%"
    >
      <Card w="100%">
        <CardHeader>
          <Heading size='md' onClick={handle}> Proposals</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            ({
              proposals.map((p, i, { length }) => {
                return <ProposalCard key={i} num={i + 1} proposal={p} last={length === i + 1} />
              })
            })
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
}
