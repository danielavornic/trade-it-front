import Link from "next/link";
import { useRouter } from "next/router";
import {
  Button,
  Flex,
  Image,
  Box,
  Container,
  Menu,
  MenuButton,
  Avatar,
  MenuItem,
  MenuList,
  MenuDivider,
  IconButton,
} from "@chakra-ui/react";
import { FiMessageSquare, FiBell } from "react-icons/fi";

import { useAuth } from "@/hooks";
import { SearchInput } from "@/components";

export const Header = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

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
    <Box shadow="sm" py={2}>
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
              boxSize="140px"
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
                    <MenuItem>
                      <Link href="/account">My profile</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="/account/products">My products</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="/product/add">Add product</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="/account/settings">Settings</Link>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      onClick={() => {
                        logout();
                        router.push("/");
                      }}
                    >
                      Log out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                <Link href="/signin">
                  <Button
                    color="gray"
                    mr={6}
                    fontSize={"sm"}
                    fontFamily={"heading"}
                    variant={"link"}
                    fontWeight={400}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    display={{ base: "none", md: "inline-flex" }}
                    fontSize={"sm"}
                    fontWeight={600}
                    fontFamily={"heading"}
                    color={"white"}
                    bg={"brand.500"}
                    _hover={{
                      bg: "brand.600",
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
