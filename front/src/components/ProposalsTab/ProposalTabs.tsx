"use client"

import { Container } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';

import ProposalsAdd from '../ProposalsAdd/ProposalsAdd';
import ProposalsList from '../ProposalsList/ProposalsList';

import { useWorkflowContext } from '@/context/workflow';

export default function ProposalsTab() {

  const {workflowStatus,  setWorkflowStatus}  = useWorkflowContext();

  return (
    <Container>
      <ProposalsAdd />
      <Divider orientation='vertical' height='10px' />
      {(workflowStatus == 1)? <ProposalsList />: <></>}
    </Container>
  )
}