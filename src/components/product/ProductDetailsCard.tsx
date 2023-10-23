import { Product } from "@/types";
import { Card, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";

export const ProductDetailsCard = ({ product }: { product: Product }) => {
  const { details } = product;
  return (
    <Card shadow="none" border="1px solid" borderColor="gray.200" borderRadius="md" p={4}>
      <Tabs colorScheme="brand">
        <TabList>
          <Tab>Details</Tab>
          <Tab>Comments</Tab>
          <Tab>Previous Reviews</Tab>
        </TabList>

        <TabPanels pt={4}>
          <TabPanel>
            <Text fontSize="lg">{details}</Text>
          </TabPanel>
          <TabPanel>
            <Text fontSize="lg">comments</Text>
          </TabPanel>
          <TabPanel>
            <Text fontSize="lg">previouse reviews</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  );
};
