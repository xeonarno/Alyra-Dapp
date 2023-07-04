"use client"
import Layout from "@/components/Layout/Layout";
import { AbsoluteCenter, Box } from "@chakra-ui/react";

import { useAccount } from 'wagmi';

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useOwnerContext } from "@/context/owner";
import OwnerPage from "@/components/OwnerPage/OwnerPage";
import VoterPage from "@/components/VoterPage/VoterPage";

export default function Home() {
  const { isConnected } = useAccount();

  const { isOwner } = useOwnerContext();

  return (
    <Layout>
      {!isConnected &&
        <Box position='relative' h='100%' w="100%">
          <AbsoluteCenter color='white' axis='both'>
            <ConnectButton />
          </AbsoluteCenter>
        </Box>
      }
      {isConnected && isOwner && <OwnerPage />}
      {isConnected && !isOwner && <VoterPage />}
    </Layout>
  )
}
