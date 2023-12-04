import { useEffect, useState } from "react";
import { Button, Stack, VStack, Text } from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types";
import { categories } from "@/api";
import Link from "next/link";

const getImgSrc = (category: Category) =>
  `/assets/images/categories/${category.name.toLowerCase()}.png`;

export const ProductCategoriesBanner = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const { data, isSuccess } = useQuery({
    queryKey: ["categories-banner"],
    queryFn: () => categories.getList(),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setSelectedCategory(data[0]);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (selectedCategory) {
      setImage(getImgSrc(selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <Stack
      flexDir={["column", "column", "row"]}
      spacing={4}
      padding={4}
      w="full"
      shadow="sm"
      borderColor="gray.100"
      borderRadius={8}
      borderWidth={1}
      bg="white"
    >
      <VStack
        flex={1}
        spacing={2}
        align="flex-start"
        maxH={380}
        overflowY="auto"
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {isSuccess &&
          data.map((category: Category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              cursor="pointer"
              bg={selectedCategory === category ? "brand.100" : "white"}
              padding={4}
              borderRadius="md"
              border={1}
              borderColor="gray.100"
              width="full"
              justifyContent="flex-start"
            >
              {category.name}
            </Button>
          ))}
      </VStack>
      <VStack
        flex={1}
        spacing={8}
        align="flex-start"
        flexBasis="50%"
        height={380}
        bg={image ? `url('${image}')` : "gray.200"}
        backgroundSize="cover"
        backgroundPosition="center"
        width="full"
        py={10}
        px={16}
      >
        <VStack align="flex-start" spacing={0}>
          <Text fontSize="4xl">Latest trending</Text>
          <Text fontSize="4xl" fontWeight={800}>
            {selectedCategory?.name}
          </Text>
        </VStack>
        <Link href={`/search?category=${selectedCategory?.id}`}>
          <Button variant="solid" bg="white" color="gray.900" minW={40}>
            View more
          </Button>
        </Link>
      </VStack>
    </Stack>
  );
};
