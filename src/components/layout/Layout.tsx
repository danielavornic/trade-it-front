import { PropsWithChildren } from "react";
import Head from "next/head";
import { Container, VStack } from "@chakra-ui/react";

import { Footer, Header } from "@/components";

interface LayoutProps {
  title?: string;
  isFull?: boolean;
  hasFooter?: boolean;
}

export const Layout = ({
  title,
  isFull,
  hasFooter = true,
  children,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} | Trade It` : "Trade It - Bartering made easy"}</title>
      </Head>

      <VStack
        minH="100vh"
        position="relative"
        overflowX="hidden"
        width="100%"
        spacing={0}
        align="stretch"
        justifyContent="space-between"
        bg="whiteAlpha.900"
      >
        <Header />
        <Container
          maxW={!isFull ? ["container.sm", "container.md", "container.lg", "8xl"] : "100%"}
          h={!isFull ? "100%" : "auto"}
          flex="1"
          py={isFull ? 0 : 16}
          as="main"
          px={isFull ? 0 : [4, 8, 12, 16]}
        >
          {children}
        </Container>
        {hasFooter && <Footer />}
      </VStack>
    </>
  );
};
