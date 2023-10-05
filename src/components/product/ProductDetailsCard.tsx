import { Product } from "@/types";
import { Card, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

export const ProductDetailsCard = ({ product }: { product: Product }) => {
  return (
    <Card shadow="none" border="1px solid" borderColor="gray.200" borderRadius="md" p={4}>
      <Tabs colorScheme="brand">
        <TabList>
          <Tab>Description</Tab>
          <Tab>About seller</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  );
};
