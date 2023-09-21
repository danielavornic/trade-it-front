import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearch } from "react-use-search";
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

import { categories, products } from "@/data";
import { Category } from "@/types";

export const SearchInput = () => {
  const router = useRouter();
  const { q, category: categoryUrl } = router.query;

  const predicate = (product: any, query: string) => {
    const baseCondition =
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.sellerName.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.condition.toLowerCase().includes(query.toLowerCase()) ||
      product.status.toLowerCase().includes(query.toLowerCase());

    if (!category || category === "All categories" || category === product.category) {
      return baseCondition;
    }

    return false;
  };

  const [category, setCategory] = useState("");
  const [filteredProducts, query, handleChange, setQuery] = useSearch(products, predicate);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push({
      pathname: "/search",
      query: { q: query, category: category },
    });
  };

  // useEffect(() => {
  //   if (q) {
  //     setQuery(q as string);
  //   }
  // }, [q]);

  // useEffect(() => {
  //   if (categoryUrl) {
  //     setCategory(categoryUrl as string);
  //   }
  // }, [categoryUrl]);

  return (
    <Box as="form" onSubmit={handleSubmit} maxW={600}>
      <InputGroup size="lg" colorScheme="brand">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search"
          value={query}
          onChange={handleChange}
          pr="224px"
          colorScheme="brand"
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
            >
              {category ? category : "All categories"}
            </MenuButton>
            <MenuList>
              {categories.map((category: Category) => (
                <MenuItem
                  key={category.id}
                  onClick={() => setCategory(category.name)}
                  value={category.name}
                >
                  {category.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Divider orientation="vertical" mx={1} pr={1} />
          <Button colorScheme="brand" size="sm" mr={2} type="submit">
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};
