import type { AppProps } from "next/app";
import { Noto_Serif_Display } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import { theme } from "../styles/theme";

const notoSerifDisplay = Noto_Serif_Display({
	subsets: [],
});

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<div className={notoSerifDisplay.className}>
				<Component {...pageProps} />
			</div>
		</ChakraProvider>
	);
}
