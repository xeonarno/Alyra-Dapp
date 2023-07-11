"use client"
import Layout from "@/Layout/Layout";
import AdminValidation from "@/components/AdminValidation/AdminValidation";
import ProposalsList from "@/components/ProposalsList/ProposalsList";
import { useOwnerContext } from "@/context/owner";
import { useWorkflowContext } from "@/context/workflow";
import { Center, Spinner } from "@chakra-ui/react";

export default function SetupPage() {

    const { nextStep, isLoading } = useWorkflowContext();

    const handleValidation = () => {
		console.log("[[VoterPage]]: validation !");
		nextStep();
	}
    const { isOwner } = useOwnerContext();

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
            <>
                <ProposalsList />
                {isOwner && <AdminValidation question="Start Vote ?" onNext={() =>  handleValidation()} />}
            </>
        }
        </Layout>
    )
}