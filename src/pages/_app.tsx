import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import "@fontsource/open-sans/400.css";
import "@fontsource/poppins/700.css";

import { AuthProvider } from "@/context";

const theme = extendTheme({
  colors: {
    white: "#FCFBFB",
    black: "#1A1A1A",
    brand: {
      500: "#0EB085",
    },
    accent: {
      500: "#F7A072",
    },
  },
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
