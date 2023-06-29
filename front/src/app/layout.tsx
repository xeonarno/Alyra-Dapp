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

const { chains, publicClient } = configureChains([hardhat], [publicProvider()])
const { connectors } = getDefaultWallets({ appName: "Voting App", projectId: "XXXXXX_TBD_XXXXXXXX", chains })

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient
})

export const metadata = {
  title: 'Voting app',
  description: 'An Ethereum Voting app mecanism',
}

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
              {children}
            </ChakraProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}
