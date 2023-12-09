import { VStack, Text } from "@chakra-ui/react";
import { ProductListItem } from "@/components";

export const ProductsList = ({ products }: { products?: any[] }) => {
  if (!products || products.length === 0) {
    return <Text>No products found.</Text>;
  }

  return (
    <VStack spacing={4} alignItems="flex-start" width="100%">
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </VStack>
  );
};
