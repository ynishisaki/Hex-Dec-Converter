import Head from "next/head";
import type { NextPage } from "next";

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
                <title>Hex Dec Converter - Integers & Floating Point</title>
            </Head>

            <header>
                <Center layerStyle='title'>Hex-Dec Converter</Center>
            </header>
            <main>
                <Box layerStyle='base'>
                    <Tabs
                        variant='line'
                        borderRadius={"2xl"}
                        colorScheme='green'>
                        <nav>
                            <TabList>
                                <Tab>integer</Tab>
                                <Tab>float (IEEE754)</Tab>
                            </TabList>
                        </nav>

                        <TabPanels>
                            {/* integer */}
                            <TabPanel>
                                <VStack spacing={20} pb={10}>
                                    <HexConvertAsInteger />
                                    <DecConvertAsInteger />
                                </VStack>
                            </TabPanel>
                            {/* float (IEEE754) */}
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
        </>
    );
};

export default Home;
