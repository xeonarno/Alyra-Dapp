"use client"
import Layout from "@/Layout/Layout";
import { useOwnerContext } from "@/context/owner";
import { useWorkflowContext } from "@/context/workflow";
import { CheckIcon } from "@chakra-ui/icons";
import { Button, Center, Container, Divider, Spinner, Text, VStack } from "@chakra-ui/react";

export default function ClosedPage() {
    const { nextStep, isLoading } = useWorkflowContext();
    const { isOwner } = useOwnerContext();

    const handleValidation = () => {
        nextStep();
    }

    return (
        <Layout>
            {isLoading ? <Center w="100vw">
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </Center> :
                <VStack w="100%">
                    <Container textAlign='center'>
                        <Text>The vote are closed !</Text>
                        <Divider orientation='vertical' height='10px' />
                        {isOwner &&<Button
                            leftIcon={<CheckIcon />}
                            onClick={handleValidation}
                            colorScheme='blue'
                            variant='solid'
                            aria-label='Vote !'
                        >

                            Get the results !
                        </Button>}
                    </Container>
                </VStack>
            }
        </Layout>
    )
}