"use client"
import Layout from "@/components/Layout/Layout";

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
      {!isConnected && <ConnectButton />}
      {isConnected && isOwner && <OwnerPage />}
      {isConnected && !isOwner && <VoterPage />}
    </Layout>
  )
}
