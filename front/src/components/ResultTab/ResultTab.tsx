"use client"

import { Container } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';

import { useWorkflowContext } from '@/context/workflow';

export default function ResultTab() {

  const {workflowStatus,  setWorkflowStatus}  = useWorkflowContext();

  return (
    <Container>
		The wining Proposal is :
      <Divider orientation='vertical' height='10px' />
	  🎉 TODO
    </Container>
  )
}