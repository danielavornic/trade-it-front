import { Product } from "@/types";
import { Card } from "@chakra-ui/react";

// FOR SEARCH RESULTS
export const ProductListItem = ({ product }: { product: Product }) => {
  const { name, description, seller, category, condition, status, targetProducts, img } = product;

  return <Card>ProductListItem</Card>;
};
