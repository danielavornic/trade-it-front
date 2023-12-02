import { Flex, Stack, Heading } from "@chakra-ui/react";
import { EmailConfirmCard, Layout } from "@/components";

const emailConfirm = () => {
  return (
    <Layout title="Check your email">
      <Flex align="center" justify="center">
        <Stack spacing={8} mx="auto" maxW="lg" px={6}>
          <Stack align="center">
            <Heading as="h1" fontSize="4xl">
              Confirm your email
            </Heading>
          </Stack>
          <EmailConfirmCard />
        </Stack>
      </Flex>
    </Layout>
  );
};

export default emailConfirm;
