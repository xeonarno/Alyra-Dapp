"use client"
import Layout from "@/components/Layout/Layout";
import AdminTab from "@/components/AdminTab/AdminTab";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { Text } from "@chakra-ui/react";


export default function Home() {
  // https://chakra-ui.com/docs/components/tabs/usage
  return (
    <Layout>
      <Tabs variant='enclosed' size='lg'>
        <TabList>
          <Tab>Admin</Tab>
          <Tab>Proposals</Tab>
          <Tab>Votes</Tab>
          <Tab isDisabled>Result</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Text fontSize='2xl' as="b">Administration Page</Text>
            <Divider orientation='vertical' height='10px' />
            <AdminTab />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
          <TabPanel>
            <p>four!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  )
}
