import { Flex, Stack, Heading } from "@chakra-ui/react";
import { Layout, SignUpCard } from "@/components";

const signup = () => {
  return (
    <Layout title="Sign Up">
      <Flex align="center" justify="center">
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
          <Stack align="center">
            <Heading as="h1" fontSize="4xl">
              Create your account
            </Heading>
          </Stack>
          <SignUpCard />
        </Stack>
      </Flex>
    </Layout>
  );
};

export default signup;
