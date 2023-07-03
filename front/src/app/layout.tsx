"use client"
import './globals.css'
import { ChakraProvider } from '@chakra-ui/react'

import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import {
  hardhat
} from "wagmi/chains";

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
import { ContractContextProvider }

  from '@/context/contract';
import {
  OwnerContextProvider
}
  from '@/context/owner';

const { chains, publicClient } = configureChains([hardhat], [publicProvider()]);
const { connectors } = getDefaultWallets({
  appName: "Voting App",
  projectId: "0667a6098b4571da416e29dd6e54e819",
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
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <ChakraProvider>
              <ContractContextProvider>
                <OwnerContextProvider>
                  <VoterContextProvider>
                    <WorkflowStatusContextProvider>
                      <ProposalContextProvider>
                        {children}
                      </ProposalContextProvider>
                    </WorkflowStatusContextProvider>
                  </VoterContextProvider>
                </OwnerContextProvider>
              </ContractContextProvider>
            </ChakraProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}
