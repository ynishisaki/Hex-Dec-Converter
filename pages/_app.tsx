import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";
import { Noto_Serif_Display } from "next/font/google";

const notoSerifDisplay = Noto_Serif_Display({
	subsets: [],
});

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<main className={notoSerifDisplay.className}>
				<Component {...pageProps} />
			</main>
		</ChakraProvider>
	);
}
