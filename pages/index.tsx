import Head from "next/head";
import type { NextPage } from "next";

import styles from "../styles/Home.module.css";
import {
    Box,
    Center,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
} from "@chakra-ui/react";

import { DecConvertAsInteger } from "../components/large/DecConvertAsInteger";
import { HexConvertAsInteger } from "../components/large/HexConvertAsInteger";
import { DecConvertAsFloat } from "../components/large/DecConvertAsFloat";
import { HexConvertAsFloat } from "../components/large/HexConvertAsFloat";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Hex-Dec Converter</title>
            </Head>
            <body className={styles.container}>
                <header>
                    <Center layerStyle='title'>Hex-Dec Converter</Center>
                </header>

                <main>
                    <Box layerStyle='base'>
                        <Tabs
                            variant='line'
                            borderRadius={"2xl"}
                            // variant='soft-rounded'
                            colorScheme='green'>
                            <nav>
                                <TabList>
                                    <Tab>integer</Tab>
                                    <Tab>float (IEEE754)</Tab>
                                </TabList>
                            </nav>

                            <TabPanels>
                                <TabPanel>
                                    <VStack spacing={20} pb={10}>
                                        <HexConvertAsInteger />
                                        <DecConvertAsInteger />
                                    </VStack>
                                </TabPanel>
                                <TabPanel>
                                    <VStack spacing={20} pb={10}>
                                        <HexConvertAsFloat />
                                        <DecConvertAsFloat />
                                    </VStack>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </main>
                <footer>
                    <Box layerStyle='footer'>
                        <Text>© 2022 monyo</Text>
                    </Box>
                </footer>
            </body>
        </>
    );
};

export default Home;
