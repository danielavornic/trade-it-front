import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// TODO: Add theme colors
const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />{" "}
    </ChakraProvider>
  );
}
