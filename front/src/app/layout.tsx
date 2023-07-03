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

import { GlobalContextProvider } from '@/context/global';
import { WorkflowStatusContextProvider } from '@/context/workflow';
import { ProposalContextProvider } from '@/context/proposals';
import { ContractContextProvider } from '@/context/contract';

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
              <GlobalContextProvider>
                <WorkflowStatusContextProvider>
                  <ContractContextProvider>
                    <ProposalContextProvider>
                      {children}
                    </ProposalContextProvider>
                  </ContractContextProvider>
                </WorkflowStatusContextProvider>
              </GlobalContextProvider>
            </ChakraProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}
