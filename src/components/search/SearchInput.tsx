import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";

import { getCategories } from "@/data";
import { Category } from "@/types";

export const SearchInput = () => {
  const router = useRouter();
  const { q, category: categoryUrl } = router.query;

  const { data: categories, isSuccess } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push({
      pathname: "/search",
      query: { q: search, category: category },
    });
  };

  useEffect(() => {
    if (q) {
      setSearch(q as string);
    }

    if (categoryUrl) {
      setCategory(categoryUrl as string);
    }
  }, [router.query]);

  return (
    <Box as="form" onSubmit={handleSubmit} maxW={600} zIndex={20} position="relative">
      <InputGroup size="lg" colorScheme="brand">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          pr="224px"
          colorScheme="brand"
          fontSize={16}
        />
        <InputRightElement width="224px" display="flex" alignItems="center" justifyContent="end">
          <Divider orientation="vertical" pr={1} />
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              rightIcon={<ChevronDownIcon />}
              size="sm"
              w="130px"
              fontWeight={400}
              color="gray.600"
            >
              {category && category.split(",").length === 1
                ? categories?.find((c) => c.id === Number(category))?.name
                : "All categories"}
            </MenuButton>
            <MenuList>
              {isSuccess &&
                categories.map((category: Category) => (
                  <MenuItem
                    key={category.id}
                    onClick={() => setCategory(category.name)}
                    value={category.name}
                    fontSize={14}
                  >
                    {category.name}
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
          <Divider orientation="vertical" mx={1} pr={1} />
          <Button colorScheme="accent" size="sm" mr={2} type="submit">
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};
