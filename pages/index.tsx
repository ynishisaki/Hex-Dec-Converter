import Head from "next/head";
import type { NextPage } from "next";

import styles from "../styles/Home.module.css";
import { Box, Center, Text, VStack } from "@chakra-ui/react";
import { DecConvert } from "../components/large/DecConvert";
import { HexConvert } from "../components/large/HexConvert";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Hex-Dec Converter</title>
            </Head>
            <main>
                <Box layerStyle='base'>
                    <Center layerStyle='title'>Hex-Dec Converter</Center>
                    <VStack spacing={20} pb={10}>
                        <HexConvert />
                        <DecConvert />
                    </VStack>
                </Box>
            </main>
            <footer>
                <Box layerStyle='footer'>
                    <Text>© 2022 monyo</Text>
                </Box>
            </footer>
        </div>
    );
};

export default Home;
