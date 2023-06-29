"use client"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Flex } from '@chakra-ui/react'

import React, { FC } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Flex
      direction="column"
      h="100vh"
      justifyContent="center"
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

export default Layout