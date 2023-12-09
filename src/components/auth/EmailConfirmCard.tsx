import { Box, Heading, Text } from "@chakra-ui/react";

export const EmailConfirmCard = () => {
  return (
    <Box rounded="lg" borderWidth={1} borderColor="gray.100" boxShadow="sm" p={8}>
      <Heading as="h2" fontSize="lg" mb={4}>
        Check your email for a sign in link
      </Heading>
      <Text>
        To keep your account secure, we've sent an email to confirm your identity. Please click the
        link in the email to sign in.
      </Text>
    </Box>
  );
};
