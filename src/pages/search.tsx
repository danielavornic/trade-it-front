import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, CardBody, Divider, HStack, Heading, Icon, VStack } from "@chakra-ui/react";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { FaThList } from "react-icons/fa";

import { products as productsApi, categories as categoriesApi, cities as citiesApi } from "@/api";
import { FilterListOptions, Layout, ProductsGrid, ProductsList } from "@/components";

const SearchPage = () => {
  const router = useRouter();
  const { q, category } = router.query;

  const [listingView, setListingView] = useState<"list" | "grid">("list");

  const { data: products } = useQuery({
    queryKey: ["search-results", q, category],
    queryFn: () =>
      productsApi.getList({ name: q as string, category: category ? Number(category) : undefined }),
  });

  const { data: categories } = useQuery({
    queryKey: ["filter-categories"],
    queryFn: () => categoriesApi.getList(),
  });

  const { data: cities } = useQuery({
    queryKey: ["filter-cities"],
    queryFn: () => citiesApi.getList(),
  });

  const resetFilter = () => {
    router.push({
      pathname: "/search",
      query: { q: router.query.q },
    });
  };

  return (
    <Layout title={q ? `"${q}" results` : "Search"}>
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
          <VStack spacing={4} w="full" alignItems="start">
            <FilterListOptions title="Categories" name="category" options={categories as any} />
            <FilterListOptions title="Cities" name="city" options={cities as any} />
          </VStack>
        </VStack>

        <VStack spacing={8} w="75%" alignItems="start">
          <Card shadow="sm " w="full" border="1px solid" borderColor="gray.100">
            <CardBody py={4}>
              <HStack spacing={4} justifyContent="space-between" alignItems="center">
                <Heading size="md" textAlign="left">
                  {products?.length} items found
                  {!q && category && (
                    <span> in {categories?.find((c: any) => c.id === Number(category))?.name}</span>
                  )}
                  {q && !category && <span> for "{q}"</span>}
                  {q && category && (
                    <span>
                      {" "}
                      for "{q}" in {categories?.find((c: any) => c.id === Number(category))?.name}
                    </span>
                  )}
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

export default SearchPage;
