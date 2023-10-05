import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { Box, FormControl, FormLabel, Input, Stack, Button, Text } from "@chakra-ui/react";

import { useAuth } from "@/hooks";

const initialFormValues = {
  email: "",
  password: "",
};

export const SignInCard = () => {
  const { signIn } = useAuth();
  const router = useRouter();
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    signIn(formValues.email, formValues.password);
    router.push("/");
  };

  return (
    <Box rounded="lg" borderWidth={1} borderColor="gray.100" boxShadow="sm" p={8}>
      <Stack spacing={4} as="form" onSubmit={handleSubmit}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={formValues.email} onChange={handleChange} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" value={formValues.password} onChange={handleChange} />
        </FormControl>
        <Stack spacing={10}>
          <Stack direction={{ base: "column", sm: "row" }} align="start" justify="space-between">
            <Text color="brand.500">Forgot password?</Text>
          </Stack>
          <Button
            bg="brand.500"
            color="white"
            _hover={{
              bg: "brand.400",
            }}
            type="submit"
          >
            Sign in
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
