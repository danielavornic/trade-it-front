import { Product } from "@/types";
import { Card } from "@chakra-ui/react";

// FOR SEARCH RESULTS
export const ProductListItem = ({ product }: { product: Product }) => {
  const { name, description, sellerName, category, condition, status, targetProduct, img } =
    product;

  return <Card>ProductListItem</Card>;
};
