import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Box, HStack, Input, Select, Text, VStack } from "@chakra-ui/react";
import { ToSignedDec } from "../components/ToSignedDec";
import { ToSignedHex } from "../components/ToSignedHex";
import { ToUnsignedDec } from "../components/ToUnsignedDec";
import { ToUnsignedHex } from "../components/ToUnsignedHex";
import { DecConvert } from "../components/DecConvert";
import { HexConvert } from "../components/HexConvert";

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<meta charSet="utf-8" />
				<title>Hex-Dec Converter</title>
				<meta
					name="description"
					content="Conversion tool between hexadecimal and decimal. It supports unsigned integers and signed integers."
				/>
				<meta name="author" content="monyo"></meta>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Box layerStyle="base">
					<VStack spacing={10}>
						<HexConvert />
						<DecConvert />
					</VStack>
				</Box>
			</main>

			<footer className={styles.footer}>
				<Text>© 2022 monyo</Text>
			</footer>
		</div>
	);
};

export default Home;
