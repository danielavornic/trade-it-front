import { Product } from "@/types";
import { Card, Stack, Text, Avatar, HStack, Box, Image } from "@chakra-ui/react";
import Link from "next/link";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";

export const ProductListItem = ({ product }: { product: Product }) => {
  const { name, description, seller, category, condition, status, targetProducts, img, city } =
    product;

  return (
    <Link
      style={{ width: "100%" }}
      href={`/product/${product.id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Card p={4} w="full">
        <HStack spacing={4}>
          <Image
            src={img}
            alt={`Image of ${name}`}
            h="100%"
            maxH="100%"
            objectFit="cover"
            w="auto"
            maxW="200px"
          />{" "}
          {/* Adjust the image size */}
          <Stack spacing={2} w="full">
            <HStack align="center" justify="space-between">
              <HStack spacing={2} align="center">
                <Box as={FaUser} fontSize="lg" color="#0EB085" />
                <Text fontWeight="bold" fontSize="lg">
                  {seller.name}
                </Text>
              </HStack>
            </HStack>
            <Text fontSize="sm">{description}</Text>
            <HStack spacing={2}>
              <Box as={FaMapMarkerAlt} fontSize="lg" color="gray.500" />
              <Text>{city.name}</Text>
            </HStack>
          </Stack>
        </HStack>
      </Card>
    </Link>
  );
};