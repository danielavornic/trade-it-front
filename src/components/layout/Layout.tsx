import { PropsWithChildren } from "react";
import Head from "next/head";
import { Box, Container, VStack } from "@chakra-ui/react";

import { Footer, Header } from "@/components";

interface LayoutProps {
  title?: string;
}

export const Layout = ({ title, children }: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} | Trade It` : "Trade It"}</title>
      </Head>

      <VStack
        minH="100vh"
        position="relative"
        overflowX="hidden"
        width="100%"
        spacing={0}
        align="stretch"
        justifyContent="space-between"
      >
        <Header />
        <Container
          maxW={["container.sm", "container.md", "container.lg", "8xl"]}
          h="full"
          flex="1"
          py={10}
          as="main"
        >
          {children}
        </Container>
        <Footer />
      </VStack>
    </>
  );
};
