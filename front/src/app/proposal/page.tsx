"use client"
import Layout from "@/Layout/Layout";
import ProposalsAdd from "@/components/ProposalsAdd/ProposalsAdd";
import ProposalsList from "@/components/ProposalsList/ProposalsList";
import { Container, Divider } from "@chakra-ui/react";

export default function ProposalPage() {
    return (
        <Layout>
            <Container>
                <ProposalsAdd />
                <Divider orientation='vertical' height='10px' />
                <ProposalsList />
            </Container>
        </Layout>
    )
}