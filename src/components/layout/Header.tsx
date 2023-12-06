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
import { FiMessageSquare } from "react-icons/fi";

import { useAuth } from "@/hooks";
import { NotificationsHeader, SearchInput } from "@/components";

const accountItems = [
  // {
  //   label: "Profile",
  //   href: "/account",
  // },
  {
    label: "My products",
    href: "/account/products",
  },
  {
    label: "Add product",
    href: "/product/add",
  },
  {
    label: "Transactions",
    href: "/account/transactions",
  },
  // {
  //   label: "Reviews",
  //   href: "/account/reviews",
  // },
  {
    label: "Settings",
    href: "/account/settings",
  },
];


export const Header = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  
  return (
    <Box shadow="sm" py={2} bg="white">
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

          <Box display={router.pathname.includes("sign") ? "none" : "block"}>
            <SearchInput />
          </Box>

          <Flex alignItems={"center"}>
            {user ? (
              <>
                <Box position="relative">
                  {/* TODO: add chat */}
                  <Box
                    position="absolute"
                    right="0"
                    top="0"
                    boxSize="0.75em"
                    bg="accent.500"
                    rounded="full"
                    zIndex={2}
                  />
                  <IconButton
                    onClick={() => router.push("/chat")}
                    aria-label="View messages"
                    icon={<FiMessageSquare />}
                    rounded="full"
                  />
                </Box>
                <NotificationsHeader />
                <Menu placement="top-end">
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
                      name={user.username}
                      colorScheme="brand"
                      bg="brand.500"
                      color="white"
                    />
                  </MenuButton>
                  <MenuList>
                    {accountItems.map((item) => (
                      <MenuItem key={item.label}>
                        <Link href={item.href}>{item.label}</Link>
                      </MenuItem>
                    ))}
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
