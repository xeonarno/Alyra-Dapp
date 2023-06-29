"use client"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Flex } from '@chakra-ui/react'

import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return(
    <Flex
      direction = "column"
      h = "100vh"
      justifyContent = "center"
      >
        <Header />
        <Flex
          grow="1"
          p="2rem"
        >
        {children}
        </Flex>
        <Footer />
    </Flex>
  )
}
