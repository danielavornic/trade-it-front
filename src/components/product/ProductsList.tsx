import { VStack } from "@chakra-ui/react";
import { ProductListItem } from "@/components";

export const ProductsList = ({ products }: { products?: any[] }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <VStack spacing={4} alignItems="flex-start">
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </VStack>
  );
};
