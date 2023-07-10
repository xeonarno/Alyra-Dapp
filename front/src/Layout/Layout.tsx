"use client"
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { Flex } from '@chakra-ui/react'

import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Flex
      direction="column"
      h="100vh"
      justifyContent="start"
      flex="1"
    >
      <Header/>
      <Flex grow="1" p="1rem"
      justifyContent="center">
        {children}
      </Flex>
      <Footer />
    </Flex>
  )
}
