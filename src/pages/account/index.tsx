import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaThList } from "react-icons/fa";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { Button, Card, CardBody, HStack, Heading, Icon, VStack } from "@chakra-ui/react";

import { User } from "@/types";
import { products as productsApi } from "@/api";
import { useAuth } from "@/hooks";
import { Layout, ProductsGrid, ProductsList, UserCard, isAuth } from "@/components";

const Account = () => {
  const [listingView, setListingView] = useState<"list" | "grid">("grid");
  const { user } = useAuth();

  const { data: products } = useQuery({
    queryKey: ["my-products", user?.id],
    queryFn: () => productsApi.getList({ status: "all", seller: user?.id }),
  });

  return (
    <Layout title="My account">
      <HStack as="section" mb={20} h="full" alignItems="start" justifyContent="space-between">
        <UserCard user={user as User} />

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

export default isAuth(Account);
