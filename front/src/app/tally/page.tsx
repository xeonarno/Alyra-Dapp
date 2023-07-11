"use client"
import Layout from "@/Layout/Layout";
import { useProposalContext } from "@/context/proposal";
import { useVoteContext } from "@/context/vote";
import { CheckIcon } from "@chakra-ui/icons";
import { Button, Card, CardBody, CardHeader, Center, Divider, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function TallyPage() {

    const { address } = useAccount();
    const { winner, getTheWinner } = useVoteContext();
    const { proposals, requireProposals } = useProposalContext();


    const handleValidation = async () => {
        if (!proposals.length) {
            await requireProposals();
        }
        await getTheWinner();
    }

    useEffect(() => {
        requireProposals();
    }, []);

    return (
        <Layout>
            {winner < 0 ?
                <Center>
                    <Button
                        leftIcon={<CheckIcon />}
                        onClick={handleValidation}
                        colorScheme='blue'
                        variant='solid'
                        aria-label='Vote !'
                    >
                        Request the results
                    </Button>
                </Center>
                :

                <Card width="100%">
                    <CardHeader>
                        <Heading size='md'>The results</Heading>
                        <Text pt='2' fontSize='sm'>⟠ {address}</Text>
                    </CardHeader>
                    <CardBody>
                        <Text> The winner is : n°{winner}</Text>
                        <Divider orientation='vertical' height='10px' />
                        <Text> {proposals[winner].description} ({proposals[winner].voteCount.toString()} vote(s))</Text>
                    </CardBody>
                </Card>
            }
        </Layout>
    )
}