import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { decodeToken } from "react-jwt";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { auth } from "@/api";
import { useAuth } from "@/hooks";

const initialFormValues = {
  name: "",
  surname: "",
  username: "",
  email: "",
  password: "",
};

export const SignUpCard = () => {
  const router = useRouter();
  const toast = useToast();

  const [formValues, setFormValues] = useState(initialFormValues);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    mutate(formValues);
  };

  const { mutate } = useMutation(auth.signup, {
    onSuccess: ({ data }: any) => {
      if (data.success) {
        router.push("/email-confirm");
        return;
      }

      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <Stack spacing={4} mx="auto" maxW="lg" px={6}>
      <Box
        rounded="lg"
        borderWidth={1}
        borderColor="gray.100"
        boxShadow="sm"
        p={8}
        as="form"
        onSubmit={handleSubmit}
      >
        <Stack spacing={4}>
          <HStack>
            <Box>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" onChange={handleChange} />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="surname">
                <FormLabel>Surname</FormLabel>
                <Input type="text" onChange={handleChange} />
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" onChange={handleChange} />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" onChange={handleChange} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? "text" : "password"} onChange={handleChange} />
              <InputRightElement h="full">
                <Button
                  variant="ghost"
                  onClick={() => setShowPassword((showPassword) => !showPassword)}
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg="brand.500"
              color="white"
              _hover={{
                bg: "brand.600",
              }}
              type="submit"
            >
              Sign up
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align="center">
              Already a user?{" "}
              <Link color="brand.500" href="/signin">
                Sign in
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
