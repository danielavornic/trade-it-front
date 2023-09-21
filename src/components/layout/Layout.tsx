import { PropsWithChildren } from "react";
import Head from "next/head";

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
      <main>{children}</main>
      <Footer />
    </>
  );
};
