"use client"
import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react"
import { Image } from '@chakra-ui/react'

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";


const Header = () => {
  const { isConnected } = useAccount()
  return (
    <Flex
      p="1rem"
      justifyContent="space-between"
      alignItems="center"
    >

      <Box boxSize='xs'>
        <Image src='https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fwww.ville-montmorency.fr%2Fsites%2Fmontmorency%2Ffiles%2Finline-images%2FVOTE.png&sp=1688428891T2b4d690a11388629de29f601dc6861b763f4bae3b33b42cc275fa87afcf103af' alt='Vote !' />
      </Box>

      {isConnected && <ConnectButton />}
    </Flex>
  );
}
export default Header
