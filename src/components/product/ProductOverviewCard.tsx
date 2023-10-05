import { Card, HStack } from "@chakra-ui/react";
import { Product } from "@/types";
import { SellerCard } from "./SellerCard";

export const ProductOverviewCard = ({ product }: { product: Product }) => {
  const { id, name, description, sellerName, category, condition, status, targetProduct, img } =
    product;

  return (
    <Card shadow="none" border="1px solid" borderColor="gray.200" borderRadius="md" p={5}>
      <HStack>
        <SellerCard sellerUsername="yum3lo" />
      </HStack>
    </Card>
  );
};
