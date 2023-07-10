import { Badge, Box, Heading, Text } from "@chakra-ui/react";

export default function ProposalCard( { num, proposal, last = false }:any) {
    return(
      <Box>
      <Heading size='xs' >
      Proposal #{ num } {last && <Badge ml='1' fontSize='0.8em' colorScheme='green'>New</Badge>}
      </Heading>
      <Text pt='2' fontSize='sm'>
      👉 { proposal.description }
      </Text>
    </Box>
    );
  }