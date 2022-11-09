import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Box, Center, Text, VStack } from "@chakra-ui/react";
import { DecConvert } from "../components/DecConvert";
import { HexConvert } from "../components/HexConvert";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            {/* <Head></Head> */}
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
