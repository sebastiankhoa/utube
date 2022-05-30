import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/pacifico";
import NextNProgress from "nextjs-progressbar";
import { useRouter } from "next/router";

import theme from "../../chakra/theme";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	return (
		<ChakraProvider theme={theme}>
			<NextNProgress color="red" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
			<Component key={router.asPath} {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
