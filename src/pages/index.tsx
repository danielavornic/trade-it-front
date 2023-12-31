import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Box, Button, HStack, Heading, VStack, Text, Flex, Icon, useToast } from "@chakra-ui/react";
import { decodeToken } from "react-jwt";
import { MdOutlineSwapVerticalCircle } from "react-icons/md";
import { LuHeartHandshake } from "react-icons/lu";

import { auth, products as productsApi } from "@/api";
import { useAuth } from "@/hooks";
import { Layout, ProductCategoriesBanner, ProductsGrid, ProductsSlider } from "@/components";

export default function Home() {
  const { query, push } = useRouter();
  const { emailToken, redirectProductId } = query;
  const { setUser } = useAuth();

  const toast = useToast();

  const { data } = useQuery({
    queryKey: ["popular-products"],
    queryFn: () => productsApi.getList(),
  });

  const { mutate } = useMutation(() => auth.confirmEmail(String(emailToken)), {
    onSuccess: ({ data }: any) => {
      const { token } = data;
      const decodedToken = decodeToken(token) as any;
      const user = {
        id: Number(decodedToken?.user_id),
        username: decodedToken?.sub,
        token,
      };

      setUser(user);
      Cookies.set("token", JSON.stringify(token), {
        expires: token.exp,
      });

      toast({
        title: "Account created and confirmed.",
        description: "We've created your account for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      const parsedRedirectProductId = decodeURIComponent(String(redirectProductId || "")).trim();
      if (redirectProductId) push(`/product/${parsedRedirectProductId}`);
      else push("/", undefined, { shallow: true });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const popularProducts = data?.sort(() => Math.random() - 0.5).slice(0, 8);
  const featuredProducts = data?.sort(() => Math.random() - 0.5).slice(0, 8);

  useEffect(() => {
    if (emailToken) {
      mutate();
    }
  }, [emailToken]);

  return (
    <Layout>
      <section>
        <ProductCategoriesBanner />
      </section>

      <Box as="section" pt={20} pb={24}>
        <Heading as="h1" size="2xl" textAlign="center">
          Trade It - Bartering made easy
        </Heading>
      </Box>

      <Box as="section">
        <ProductsSlider title="Popular products" products={popularProducts} />
      </Box>

      <HStack spacing={6} alignItems="stretch" as="section" pt={20}>
        <HStack bg="brand.100" spacing={8} borderRadius={10} p={10} flex={1}>
          <div>
            <Flex
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              bg="white"
              width={16}
              height={16}
            >
              <Icon as={MdOutlineSwapVerticalCircle} boxSize={8} color="brand.500" />
            </Flex>
          </div>
          <VStack alignItems="start">
            <Heading as="h2" size="lg" mb="4">
              What is Bartering?
            </Heading>
            <Text>
              Bartering is a centuries-old system where goods and services are exchanged directly,
              bypassing the need for money. It encourages fair and equitable trade among people.
            </Text>
          </VStack>
        </HStack>

        <HStack bg="brand.100" spacing={8} borderRadius={10} p={10} flex={1}>
          <div>
            <Flex
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              bg="white"
              width={16}
              height={16}
            >
              <Icon as={LuHeartHandshake} boxSize={8} color="brand.500" />
            </Flex>
          </div>
          <VStack alignItems="start">
            <Heading as="h2" size="lg" mb="4">
              Benefits of Bartering
            </Heading>
            <Text>
              Bartering offers the opportunity to trade your goods or services for what you need,
              fostering financial savings while satisfying your requirements or desires. It's a
              win-win arrangement.
            </Text>
          </VStack>
        </HStack>
      </HStack>

      <Box as="section" py={20}>
        <ProductsGrid title="Recommended items" products={featuredProducts} />
      </Box>

      <Box as="section" py={20} bg="brand.500" px={14} borderRadius={10}>
        <HStack spacing={4} justifyContent="space-between" color="white">
          <VStack alignItems="start">
            <Heading as="h2" size="lg">
              Start bartering today
            </Heading>
            <Text fontSize="lg" color="gray.50">
              Create an account to start trading
            </Text>
          </VStack>

          <Link href="/signup">
            <Button bg="white" size="lg">
              Get started
            </Button>
          </Link>
        </HStack>
      </Box>
    </Layout>
  );
}
