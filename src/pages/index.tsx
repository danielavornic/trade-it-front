import { Layout } from "@/components";
import { Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Layout>
      <Heading as="h1" size="4xl" noOfLines={1}>
        Backenderi losi
      </Heading>
    </Layout>
  );
}
