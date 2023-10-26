import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { decodeToken } from "react-jwt";
import { Box, FormControl, FormLabel, Link, Input, Stack, Button, Text } from "@chakra-ui/react";

import { useAuth } from "@/hooks";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/api";

const initialFormValues = {
  username: "",
  password: "",
};

export const SignInCard = () => {
  const { setUser } = useAuth();
  const router = useRouter();
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      mutate(formValues);
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate } = useMutation(auth.signin, {
    onSuccess: ({ data }: any) => {
      const { token } = data;
      const decodedToken = decodeToken(token) as any;
      const user = {
        id: Number(decodedToken?.user_id),
        name: decodedToken?.firstName,
        surname: decodedToken?.lastName,
        username: formValues.username,
        token,
      };
      setUser(user);

      const nextUrl = router.query.next as string;
      router.push(nextUrl || "/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <Box rounded="lg" borderWidth={1} borderColor="gray.100" boxShadow="sm" p={8}>
      <Stack spacing={4} as="form" onSubmit={handleSubmit}>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input type="text" value={formValues.username} onChange={handleChange} />
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
        <Stack pt={6}>
          <Text align="center">
            No account?{" "}
            <Link
              color="brand.500"
              href={`/signup${router.query.next ? `?next=${router.query.next}` : ""}`}
              fontWeight="bold"
            >
              Sign up
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};
