"use client"
import './globals.css';
import { ChakraProvider } from '@chakra-ui/react';

import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import {
  hardhat,
  sepolia
} from "wagmi/chains";

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import {
  VoterContextProvider,
} from "@/context/voter";

import {
  WorkflowStatusContextProvider,
} from '@/context/workflow';

import {
  ProposalContextProvider,
} from '@/context/proposal';

import { ContractContextProvider } from '@/context/contract';
import {
  OwnerContextProvider
} from '@/context/owner';
import { VoteContextProvider } from '@/context/vote';

const providers = [publicProvider(), alchemyProvider({apiKey:process.env.NEXT_PUBLIC_ALCHEMY} as any)];
const { chains, publicClient } = configureChains([hardhat, sepolia], providers as any);
const { connectors } = getDefaultWallets({
  appName: "Voting App",
  projectId: process.env.NEXT_PUBLIC_WAGMI as string,
  chains
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ContractContextProvider>
          <OwnerContextProvider>
            <WorkflowStatusContextProvider>
              <VoterContextProvider>
                <ProposalContextProvider>
                <VoteContextProvider>
                  <WagmiConfig config={wagmiConfig}>
                    <RainbowKitProvider coolMode chains={chains}>
                      <ChakraProvider>

                        {children}

                      </ChakraProvider>
                    </RainbowKitProvider>
                  </WagmiConfig>
                </VoteContextProvider>
                </ProposalContextProvider>
              </VoterContextProvider>
            </WorkflowStatusContextProvider>
          </OwnerContextProvider>
        </ContractContextProvider>
      </body>
    </html>
  )
}
