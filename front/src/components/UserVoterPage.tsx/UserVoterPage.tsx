import { useVoterContext } from "@/context/voter";
import { CheckIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Divider, Text, VStack } from "@chakra-ui/react";

export default function UserVoterPage() {
    const { isVoter, checkVoterStatus } = useVoterContext();
    const onRequestVoter = async () => {
        await checkVoterStatus();
    }
    return (
        <VStack w="100%">
            <Box>
                {isVoter ?
                    <>
                        <Text fontSize='2xl' as="b" marginRight="1rem">You are a voter ! </Text>
                    </>
                    :
                    <>
                        <Text fontSize='2xl' as="b" marginRight="1rem">Waiting for voter access...</Text>
                        <Divider orientation='vertical' height='10px' />
                        <Button
                            leftIcon={<CheckIcon />}
                            onClick={onRequestVoter}
                            colorScheme='blue'
                            variant='solid'
                            aria-label='Ask Voter access'
                        >
                            Ask Voter access
                        </Button>
                    </>
                }
            </Box>
        </VStack>
    )

}