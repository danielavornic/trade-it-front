import { PropsWithChildren } from "react";
import Head from "next/head";
import { Container } from "@chakra-ui/react";

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

      <Header />
      <Container maxW={["container.sm", "container.md", "container.lg", "8xl"]}>
        {children}
      </Container>
      <Footer />
    </>
  );
};
