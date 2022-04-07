import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Box, HStack, Input, Select, Text, VStack } from "@chakra-ui/react";
import { ToSignedDec } from "../components/ToSignedDec";
import { ToSignedHex } from "../components/ToSignedHex";
import { ToUnsignedDec } from "../components/ToUnsignedDec";
import { ToUnsignedHex } from "../components/ToUnsignedHex";
import { UnSignedConvert } from "../components/UnSignedConvert";
import { HexConvert } from "../components/HexConvert";

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<VStack spacing={10}>
					{/* <ToUnsignedDec></ToUnsignedDec>
					<ToSignedDec></ToSignedDec>
					<ToUnsignedHex></ToUnsignedHex>
					<ToSignedHex></ToSignedHex> */}
					{/* <HStack>
						<Text fontSize={"xl"}>precision</Text>
						<Select
							size={"lg"}
							width="auto"
							// placeholder="Select option"
						>
							<option value="auto">Auto</option>
							<option value="8bit">8 bit</option>
							<option value="16bit">16 bit</option>
						</Select>
					</HStack> */}

					<HexConvert />
					<UnSignedConvert />
				</VStack>
			</main>

			<footer className={styles.footer}></footer>
		</div>
	);
};

export default Home;
