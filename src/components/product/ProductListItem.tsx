import { Product } from "@/types";

// FOR SEARCH RESULTS
export const ProductListItem = ({ product }: { product: Product }) => {
  const { name, description, sellerName, category, condition, status, targetProduct, img } =
    product;

  return <div>ProductListItem</div>;
};
