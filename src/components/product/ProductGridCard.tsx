// https://chakra-ui.com/docs/components/card/usage

import { Card } from "@chakra-ui/react";
import Link from "next/link";

import { Product } from "@/types";

export const ProductGridCard = ({ product }: { product: Product }) => {
  const { id, name, description, sellerName, category, condition, status, targetProduct, img } =
    product;

  return (
    <Link href={`/product/${id}`}>
      <Card shadow="sm">ProductCard</Card>;
    </Link>
  );
};
