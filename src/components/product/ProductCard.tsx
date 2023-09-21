// https://chakra-ui.com/docs/components/card/usage

import { Product } from "@/types";

export const ProductCard = ({ product }: { product: Product }) => {
  const { name, description, sellerName, category, condition, status, targetProduct, img } =
    product;

  return <div>ProductCard</div>;
};
