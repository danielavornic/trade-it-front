import React from "react";
import {
  Spacer,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TabList,
  Image,
  Box,
} from "@chakra-ui/react";
import { FiMessageSquare, FiBell } from "react-icons/fi";
import { IconButton } from "@chakra-ui/button";
import { HamburgerIcon } from "@chakra-ui/icons";
import { SearchInput } from "@/components";
import { getCategories } from "@/data";
import { Category } from "@/types";

const Logo = (props: any) => {
  return (
    <a href="./Layout">
      <Image
        boxSize="180px"
        height="auto"
        src="/assets/images/Logo.jpg"
        alt="Logo"
        style={{ mixBlendMode: "multiply" }}
      />
    </a>
  );
};

const Profile = (props: any) => {
  return (
    <Image
      boxSize="50px"
      height="auto"
      src="/assets/images/profile.png"
      alt="Profile"
      style={{ mixBlendMode: "multiply" }}
    />
  );
};

export const Navbar: React.FC = () => {
  const categories = getCategories();
  const menuItems = categories.map((category: Category) => (
    <MenuItem key={category.id}>{category.name}</MenuItem>
  ));

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
    <div className="navbar">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={2}
        bg="white"
        color="black"
      >
        <Logo />
        <Box ml={4}>
          <SearchInput />
        </Box>
        <Spacer />

        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            size="sm"
            onClick={() => handleButtonClick("message")}
            variant="unstyled"
            _hover={{ backgroundColor: "gray.100" }}
            ml={20}
          >
            <Icon as={FiMessageSquare} boxSize={6} />
          </Button>
          <Button
            size="sm"
            onClick={() => handleButtonClick("bell")}
            variant="unstyled"
            _hover={{ backgroundColor: "gray.100" }}
            ml={4}
          >
            <Icon as={FiBell} boxSize={6} />
          </Button>
        </div>

        <Spacer />

        <Button
          size="sm"
          onClick={() => handleButtonClick("profile")}
          variant="unstyled"
          _hover={{ backgroundColor: "gray.100" }}
          ml={2}
        >
          <Icon as={Profile} boxSize={6} />
        </Button>
      </Flex>

      <Flex
        alignItems="center"
        justifyContent="space-between"
        mx={2}
        borderWidth={0}
        overflowX="auto"
      >
        <Menu>
          <MenuButton as={IconButton} aria-label="All categories" variant="outline">
            <HamburgerIcon />
            All categories
          </MenuButton>
          <MenuList>{menuItems}</MenuList>
        </Menu>

        <Tabs defaultIndex={1} borderBottomColor="transparent">
          <TabList>
            <Tab
              py={1}
              m={0}
              ml={8}
              _hover={{
                color: "#0EB085",
              }}
              _active={{
                color: "#0EB085",
              }}
              _focus={{
                boxShadow: "none",
                color: "#0EB085",
              }}
            >
              New in
            </Tab>
          </TabList>
        </Tabs>

        <Select
          size="sm"
          ml={4}
          placeholder="Help"
          width="auto"
          variant="unstyled"
          _hover={{
            color: "#0EB085",
          }}
          _active={{
            color: "#0EB085",
          }}
          _focus={{
            boxShadow: "none",
            color: "#0EB085",
          }}
        >
          <option value="option1">Contacts</option>
          <option value="option2">Our Policy</option>
          <option value="option3">Questions</option>
        </Select>
        <Spacer />
        <Select
          size="sm"
          placeholder="English"
          width="auto"
          variant="unstyled"
          _hover={{
            color: "#0EB085",
          }}
          _active={{
            color: "#0EB085",
          }}
          _focus={{
            boxShadow: "none",
            color: "#0EB085",
          }}
        >
          <option value="option1">Română</option>
          <option value="option2">Русский</option>
        </Select>

        <Select
          size="sm"
          placeholder="Chisinau"
          width="auto"
          variant="unstyled"
          _hover={{
            color: "#0EB085",
          }}
          _active={{
            color: "#0EB085",
          }}
          _focus={{
            boxShadow: "none",
            color: "#0EB085",
          }}
        >
          <option value="option1">Bălți</option>
          <option value="option2">Cahul</option>
          <option value="option3">Soroca</option>
        </Select>
      </Flex>
    </div>
  );
};
