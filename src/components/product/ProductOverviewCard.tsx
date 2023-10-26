import { Card, HStack, Image, Box, Text, VStack, Spacer, Heading, Badge } from "@chakra-ui/react";
import { Product } from "@/types";
import { SellerCard } from "@/components";

export const ProductOverviewCard = ({ product }: { product: Product }) => {
  const { name, description, img, condition, targetProducts } = product;

  return (
    <Card shadow="sm" p={2} fontSize="3xl" border="1px solid" borderColor="gray.200">
      <HStack justify="space-between" alignItems="flex-start" spacing={8}>
        <Image
          src={img}
          alt={name}
          margin="20px"
          width="400px"
          height="400px"
          objectFit="cover"
          borderRadius="md"
          border="1px solid"
          borderColor="gray.200"
        />
        <VStack p={2} align="start" spacing={2}>
          <Box padding={2}>
            <Badge fontSize="0.5em" bg="accent.200" mb="6">
              {condition}
            </Badge>
            <Heading fontSize="4xl" as="h1" fontWeight="bold" mb="4">
              {name}
            </Heading>
            <Box fontSize="xl" mb="4">
              <Text color="brand.500" display="inline" fontWeight="bold">
                Looking for:{" "}
              </Text>
              {targetProducts}
            </Box>
            <Text fontSize="lg" color="gray.700">
              {description}
            </Text>
          </Box>
        </VStack>
        <Spacer />
        <Box padding={4}>
          <SellerCard product={product} />
        </Box>
      </HStack>
    </Card>
  );
};
