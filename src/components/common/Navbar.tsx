import React from "react";
import {
  Box,
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
} from "@chakra-ui/react";
import { FiMessageSquare, FiBell } from "react-icons/fi";
import { IconButton } from "@chakra-ui/button";
import { HamburgerIcon } from "@chakra-ui/icons";
import { SearchInput } from "@/components";
import { getCategories } from "@/data";
import { Category } from "@/types";

const Logo = (props: any) => {
  return (
    <Image
      boxSize="120px"
      height="auto"
      src="/assets/images/Logo.jpg"
      alt="Logo"
      style={{ mixBlendMode: "multiply" }}
    />
  );
};

const Profile = (props: any) => {
  return (
    <Image
      boxSize="40px"
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
        <SearchInput />
        <Icon as={FiMessageSquare} boxSize={6} ml={4} />
        <Icon as={FiBell} boxSize={6} ml={4} />
        <Profile />
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
              style={{ textAlign: "left" }}
              _focus={{
                boxShadow: "none",
              }}
            >
              New in
            </Tab>
          </TabList>
        </Tabs>

        <Select size="sm" placeholder="Help" width="auto" variant="unstyled">
          <option value="option1">Contacts</option>
          <option value="option2">Our Policy</option>
          <option value="option3">Questions</option>
        </Select>

        <Select size="sm" placeholder="English" width="auto" variant="unstyled">
          <option value="option1">Română</option>
          <option value="option2">Русский</option>
        </Select>

        <Select size="sm" placeholder="Chisinau" width="auto" variant="unstyled">
          <option value="option1">Bălți</option>
          <option value="option2">Cahul</option>
          <option value="option3">Soroca</option>
        </Select>
      </Flex>
    </div>
  );
};
