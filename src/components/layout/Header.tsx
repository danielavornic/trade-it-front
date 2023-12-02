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
  AvatarBadge,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FiMessageSquare, FiBell } from "react-icons/fi";

import { useAuth } from "@/hooks";
import { SearchInput } from "@/components";

const accountItems = [
  {
    label: "Profile",
    href: "/account",
  },
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
  {
    label: "Reviews",
    href: "/account/reviews",
  },
  {
    label: "Settings",
    href: "/account/settings",
  },
];

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
                <Box position="relative" ml={4} mr={4}>
                  {/* TODO: add notifications */}
                  <Box
                    position="absolute"
                    right="0"
                    top="0"
                    boxSize="0.75em"
                    bg="accent.500"
                    rounded="full"
                    zIndex={2}
                  />
                  <Popover placement="top-end">
                    <PopoverTrigger>
                      <IconButton
                        onClick={() => handleButtonClick("bell")}
                        aria-label="View notifications"
                        icon={<FiBell />}
                        rounded="full"
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverBody>
                        <Box w="full" h="full" p={3} textAlign="center">
                          No notifications yet
                        </Box>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>
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
