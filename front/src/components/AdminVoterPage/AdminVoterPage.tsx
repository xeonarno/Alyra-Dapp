import { useWorkflowContext } from "@/context/workflow";
import { Box, Container, Divider, Text, VStack } from "@chakra-ui/react";
import AdminValidation from "../AdminValidation/AdminValidation";
import AdminAddVoter from "../AdminAddVoter/AdminAddVoter";
import AdminCardVoters from "../AdminCardVoters/AdminCardVoters";


export default function AdminVoterPage() {

    const { nextStep, isLoading } = useWorkflowContext();

    const handleValidation = () => {
        console.log("[[VoterPage]]: validation !");
        nextStep();
    }

    return (
        <VStack w="100%">
            <Box>
                <Text fontSize='2xl' as="b" marginRight="1rem">Voters Registration</Text>
                <AdminValidation question="Close Voters registration ?" onNext={() => handleValidation()} />
            </Box>
            <Divider orientation='vertical' height='10px' />
            <Container>
                <AdminAddVoter />
                <Divider orientation='vertical' height='10px' />
                <AdminCardVoters />
            </Container>
        </VStack >
    )

}