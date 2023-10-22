import { Card, HStack, Image, Box, Text, VStack, Spacer } from "@chakra-ui/react";
import { Product } from "@/types";
import { SellerCard } from "./SellerCard";

export const ProductOverviewCard = ({ product }: { product: Product }) => {
  const { name, description, img, condition, targetProducts } = product;

  return (
    <Card shadow="none" p={2} fontSize="3xl">
      <HStack justify="space-between">
        <Image
          src={img}
          alt={name}
          margin="20px"
          width="400px"
          height="400px"
          objectFit="cover"
          borderRadius="md"
        />
        <VStack p={2} align="start" spacing={2}>
          <Box padding={2}>
            <Text fontSize="3xl" fontWeight="bold">
              {name}
            </Text>
            <Text fontSize="xl">{description}</Text>
            <Text fontSize="xl" color="gray.500">
              Condition: {condition}
            </Text>
            <Text fontSize="xl">Target Products: {targetProducts}</Text>
          </Box>
        </VStack>
        <Spacer />
        <Box padding={2}>
          <SellerCard sellerUsername={product.seller.name} />
        </Box>
      </HStack>
    </Card>
  );
};
