"use client"
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Flex, Text } from "@chakra-ui/react"
import { useAccount } from "wagmi";


const Header = () => {
  const { isConnected } = useAccount()
  return (
    <Flex
      p="2rem"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      h="15vh"
    >
      <Text>Logo</Text>

      {isConnected && <ConnectButton />}
    </Flex>
  );
}
export default Header
