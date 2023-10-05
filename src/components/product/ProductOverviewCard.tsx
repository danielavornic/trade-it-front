import { Card } from "@chakra-ui/react";
import { Product } from "@/types";

export const ProductOverviewCard = ({ product }: { product: Product }) => {
  const { id, name, description, sellerName, category, condition, status, targetProduct, img } =
    product;

  return (
    <Card shadow="none" border="1px solid" borderColor="gray.200" borderRadius="md" p={5}>
      {id}
    </Card>
  );
};
