import Head from "next/head";
import type { NextPage } from "next";

import {
	Box,
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
		<Box layerStyle='base'>
			<Head>
				<title>Hex Dec Converter - Integers & Floating Point</title>
			</Head>

			<header>
				<Box layerStyle='title'>Hex-Dec Converter</Box>
			</header>
			<main>
				<Box layerStyle='main'>
					<Tabs
						variant='line'
						size={"lg"}
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
								<VStack spacing={10} mb={4}>
									<HexConvertAsInteger />
									<DecConvertAsInteger />
								</VStack>
							</TabPanel>
							{/* float (IEEE754) */}
							<TabPanel>
								<VStack spacing={12} mt={4} mb={16}>
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
		</Box>
	);
};

export default Home;
