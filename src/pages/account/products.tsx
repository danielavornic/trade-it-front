import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { FaThList } from "react-icons/fa";
import { HStack, VStack, Heading, Button, Card, CardBody, Icon } from "@chakra-ui/react";

import { useAuth } from "@/hooks";
import { products as productsApi } from "@/api";
import { AccountSidebar, Layout, ProductsGrid, ProductsList, isAuth } from "@/components";

const MyAccount = () => {
  const [listingView, setListingView] = useState<"list" | "grid">("list");
  const { user } = useAuth();

  const { data: products } = useQuery({
    queryKey: ["my-products"],
    queryFn: () => productsApi.getList({ seller: Number(user?.id) }),
  });

  return (
    <Layout title={"My products"}>
      <HStack as="section" mb={20} h="full" alignItems="start" justifyContent="space-between">
        <AccountSidebar />

        <VStack spacing={8} w="75%" alignItems="start">
          <Card shadow="sm " w="full" border="1px solid" borderColor="gray.100">
            <CardBody py={4}>
              <HStack spacing={4} justifyContent="space-between" alignItems="center">
                <Heading size="md" textAlign="left">
                  My products
                </Heading>

                <HStack spacing={2}>
                  <Button
                    w={10}
                    h={10}
                    variant={listingView === "list" ? "solid" : "outline"}
                    colorScheme="gray"
                    onClick={() => setListingView("list")}
                  >
                    <Icon as={FaThList} />
                  </Button>
                  <Button
                    w={10}
                    h={10}
                    variant={listingView === "grid" ? "solid" : "outline"}
                    colorScheme="gray"
                    onClick={() => setListingView("grid")}
                  >
                    <Icon as={TfiLayoutGrid2Alt} />
                  </Button>
                </HStack>
              </HStack>
            </CardBody>
          </Card>

          {listingView === "grid" ? (
            <ProductsGrid products={products} cols={3} />
          ) : (
            <ProductsList products={products} />
          )}
        </VStack>
      </HStack>
    </Layout>
  );
};

export default isAuth(MyAccount);
