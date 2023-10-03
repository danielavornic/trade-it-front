import { useAuth } from "@/hooks";
import React from "react";
import {
  Spacer,
  Button,
  Flex,
  Icon,
  Image,
  Box,
  Container,
  HStack,
  Menu,
  MenuButton,
  Avatar,
  MenuItem,
  MenuList,
  MenuDivider,
  IconButton,
} from "@chakra-ui/react";
import { FiMessageSquare, FiBell } from "react-icons/fi";
import { SearchInput } from "@/components";
import Link from "next/link";

export const Header = () => {
  const { user } = useAuth();

  const handleButtonClick = (buttonName: string) => {
    switch (buttonName) {
      case "message":
        console.log("Message button clicked");
        break;
      case "bell":
        console.log("Bell button clicked");
        break;
      case "profile":
        console.log("Profile button clicked");
        break;
    }
  };

  return (
    <Box bg="gray.50">
      <Container maxW={["container.sm", "container.md", "container.lg", "8xl"]} as="header">
        <Flex
          as="nav"
          alignItems="center"
          justify="space-between"
          wrap="wrap"
          padding={2}
          bg="white"
          color="black"
        >
          <Link href="/">
            <Image
              boxSize="180px"
              height="auto"
              src="/assets/images/Logo.jpg"
              alt="Logo"
              style={{ mixBlendMode: "multiply" }}
            />
          </Link>

          <Box>
            <SearchInput />
          </Box>

          <Flex alignItems={"center"}>
            {user ? (
              <>
                <IconButton
                  onClick={() => handleButtonClick("bell")}
                  aria-label="View messages"
                  icon={<FiMessageSquare />}
                  rounded="full"
                />
                <IconButton
                  onClick={() => handleButtonClick("bell")}
                  aria-label="View notifications"
                  icon={<FiBell />}
                  rounded="full"
                  ml={4}
                  mr={4}
                />
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      w="40px"
                      h="40px"
                      src={
                        "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Link 1</MenuItem>
                    <MenuItem>Link 2</MenuItem>
                    <MenuDivider />
                    <MenuItem>Link 3</MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                <Button as={"a"} mr={6} fontSize={"sm"} variant={"link"} href={"#"}>
                  Sign In
                </Button>
                <Button
                  as={"a"}
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"brand.500"}
                  href={"#"}
                  _hover={{
                    bg: "brand.600",
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
