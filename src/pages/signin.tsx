import { Flex, Stack, Heading } from "@chakra-ui/react";
import { Layout, SignInCard } from "@/components";

const signin = () => {
  return (
    <Layout title="Sign In">
      <Flex align="center" justify="center">
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
          <Stack align="center">
            <Heading as="h1" fontSize="4xl">
              Sign in to your account
            </Heading>
          </Stack>
          <SignInCard />
        </Stack>
      </Flex>
    </Layout>
  );
};

export default signin;
