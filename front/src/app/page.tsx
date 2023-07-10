"use client"
import Layout from "@/Layout/Layout";
import { Center, Flex, Spinner } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();
  return (
    <Layout>
      <Flex
        alignItems='center'
        justifyContent='center'
      >
        <Center w="100vw">
          {isConnected ? <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          /> :
            <ConnectButton />}
        </Center>
      </Flex>
    </Layout>
  )
}
