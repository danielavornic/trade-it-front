import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextProgress from "next-progress";

import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

import { AuthProvider } from "@/context";

const theme = extendTheme({
  colors: {
    white: "#FFFFFF",
    black: "#1A1A1A",
    brand: {
      100: "rgb(14, 176, 133, 0.1)",
      400: "#0b8e6b",
      500: "#0EB085",
      600: "#0b8e6b",
    },
    accent: {
      200: "#fcdfcf",
      500: "#F7A072",
    },
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <NextProgress options={{ showSpinner: false }} color="#0EB085" height={4} />
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
