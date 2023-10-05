import { Layout } from "@/components";
import { Box, HStack, Heading } from "@chakra-ui/react";

const AddProductPage = () => {
  return (
    <Layout title="Add item">
      <Box as="section" pt={10}>
        <Heading as="h2" size="lg" mb="4">
          Add item
        </Heading>
      </Box>

      <Box as="section" py={10}>
        <HStack></HStack>
      </Box>
    </Layout>
  );
};

export default AddProductPage;
