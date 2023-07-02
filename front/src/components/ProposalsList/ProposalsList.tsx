"use client"

import { Container } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';

import { Box } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { Stack, StackDivider } from '@chakra-ui/react';

//-import { useGlobalContext } from '@/context/global';
import { useProposalContext } from '@/context/proposals';

export default function ProposalsList() {


  //-const {voters,  setVoters}  = useGlobalContext();
	const {proposals,  setProposals}  = useProposalContext();

  function ProposalCard( { num, proposal }:any) {
    return(
      <Box>
      <Heading size='xs' >
      Proposal #{ num }
      </Heading>
      <Text pt='2' fontSize='sm'>
      👉 { proposal.description }
      </Text>
    </Box>
    );
  }


  return (
		<Flex>
			<Card width="100%">
        <CardHeader>
          <Heading size='md'>Proposals</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
          ({
          proposals.map((p,i)=> <ProposalCard key={i} num={i+1} proposal={p} />)
          })
          </Stack>
        </CardBody>
			</Card>

		</Flex>

  );
}

/*
    <Container width='100%'>
      <Divider orientation='vertical' height='10px' />
    </Container>

*/