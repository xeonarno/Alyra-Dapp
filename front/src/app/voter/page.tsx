"use client"
import Layout from "@/Layout/Layout";
import AdminVoterPage from "@/components/AdminVoterPage/AdminVoterPage";
import UserVoterPage from "@/components/UserVoterPage.tsx/UserVoterPage";
import { useOwnerContext } from "@/context/owner";
import { useVoterContext } from "@/context/voter";
import { useWorkflowContext } from "@/context/workflow";
import { Center, Spinner } from "@chakra-ui/react";

export default function VoterPage() {
    const { isLoading } = useWorkflowContext();
    const { isOwner } = useOwnerContext();

    return (
        <Layout>
            {
                isLoading ? <Center w="100vw">
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </Center> :
                    <>{isOwner ? <AdminVoterPage /> : <UserVoterPage />}</>
            }
        </Layout>
    )
}