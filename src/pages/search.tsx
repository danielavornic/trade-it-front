import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, CardBody, Divider, HStack, Heading, Icon, VStack } from "@chakra-ui/react";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { FaThList } from "react-icons/fa";

import { getProducts } from "@/data";
import { Layout, ProductsGrid, ProductsList } from "@/components";

const SearchPage = () => {
  const router = useRouter();
  const { q, category } = router.query;

  const [listingView, setListingView] = useState<"list" | "grid">("list");

  const { data: products } = useQuery({
    queryKey: ["search-results"],
    queryFn: getProducts,
  });

  const resetFilter = () => {
    router.push({
      pathname: "/search",
      query: { q: router.query.q },
    });
  };

  return (
    <Layout>
      <HStack as="section" mb={20} h="full" alignItems="start" justifyContent="space-between">
        <VStack w="20%" alignItems="start">
          <HStack w="full" justifyContent="space-between" alignItems="baseline">
            <Heading size="md" textTransform="uppercase" textAlign="left">
              Filters
            </Heading>
            <Button variant="link" size="sm" color="gray.500" onClick={resetFilter}>
              Reset filters
            </Button>
          </HStack>
          <Divider my={3} />
        </VStack>

        <VStack spacing={8} w="75%" alignItems="start">
          <Card shadow="sm " w="full" border="1px solid" borderColor="gray.100">
            <CardBody py={4}>
              <HStack spacing={4} justifyContent="space-between" alignItems="center">
                <Heading size="md" textAlign="left">
                  {products?.length} items found for "{q}" in{" "}
                  {!!category ? category : "All Categories"}
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
            <ProductsGrid products={products} />
          ) : (
            <ProductsList products={products} />
          )}
        </VStack>
      </HStack>
    </Layout>
  );
};

export default SearchPage;
