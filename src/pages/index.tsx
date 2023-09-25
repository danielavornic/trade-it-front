import { Layout } from "@/components";
import { ProductCategoriesBanner } from "@/components/product/ProductCategoriesBanner";
import { Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Layout>
      <Heading as="h1" size="4xl">
        Backenderi losi. jk only dima.
      </Heading>
      <ProductCategoriesBanner />
    </Layout>
  );
}
