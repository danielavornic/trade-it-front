import { Layout, ProductsGrid, ProductsList } from "@/components";
import { useAuth } from "@/hooks";
import { HStack, VStack, Heading, Divider, Button, Card, CardBody, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { FaThList } from "react-icons/fa";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import {products as productsApi} from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const sidebarItems = [
  {
    label: "Profile",
    href: "/account",
  },
  {
    label: "My products",
    href: "/account/products",
  },
  {
    label: "Add product",
    href: "/product/add",
  },
  {
    label: "Transactions",
    href: "/account/transactions",
  },
  {
    label: "Reviews",
    href: "/account/reviews",
  },
  {
    label: "Settings",
    href: "/account/settings",
  },
];

const MyAccount = () => {
  const [listingView, setListingView] = useState<"list" | "grid">("list");
  const {user} = useAuth();
  const router = useRouter();

  const { data: products } = useQuery({
    queryKey: ["my-products"],
    queryFn: () =>
      productsApi.getList({ seller: Number(user?.id) }),
  });
  
  return (
    <Layout title={"My products"}>
      <HStack as="section" mb={20} h="full" alignItems="start" justifyContent="space-between">
        <VStack w="20%" alignItems="start">
          <HStack w="full" justifyContent="space-between" alignItems="baseline">
            <Heading size="md" textTransform="uppercase" textAlign="left">
              Account
            </Heading>
          </HStack>
          <Divider my={3} />

          <VStack w="full" alignItems="start">
            {sidebarItems.map((item) => (
              <Button
                w="full"
                fontWeight={router.pathname === item.href ? "bold" : "normal"}
                variant="ghost"
                justifyContent="flex-start"
                color="gray.600"
                key={item.label}
                onClick={() => router.push(item.href)}
                fontFamily="poppins"
              >
                {item.label}
              </Button>
            ))}
          </VStack>
        </VStack>

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
  )
}

export default MyAccount