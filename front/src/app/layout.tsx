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

import { VotersContextProvider } from '@/context/voters';

const { chains, publicClient } = configureChains([hardhat], [publicProvider()]);
const { connectors } = getDefaultWallets({ appName: "Voting App", projectId: "XXXXXXXXXXXXXXXXXXXXX", chains })

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
              <VotersContextProvider>
                {children}
              </VotersContextProvider>
            </ChakraProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}
