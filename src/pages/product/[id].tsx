import { Box, Heading } from "@chakra-ui/react";

import { Product } from "@/types";
import { products as productsApi } from "@/api";
import {
  Layout,
  ProductDetailsCard,
  ProductOverviewCard,
  ProductsGrid,
  ProductsSlider,
} from "@/components";

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  const product = await productsApi.getById(Number(id));
  const categoryProducts = await productsApi.getList({ category: Number(product.category.id) });
  const relatedProducts = categoryProducts?.filter((p: Product) => p.id !== product.id);
  const sellerProucts = await productsApi.getList({ seller: Number(product.seller.id) });
  const fromThisSeller = sellerProucts?.filter((p: Product) => p.id !== product.id);

  return {
    props: {
      product,
      relatedProducts,
      fromThisSeller,
    },
  };
}

const ProductPage = ({
  product,
  relatedProducts,
  fromThisSeller,
}: {
  product: Product;
  relatedProducts: Product[];
  fromThisSeller: Product[];
}) => {
  if (!product) {
    return null;
  }

  return (
    <Layout title={product?.name || "Product"}>
      <Box as="section" pt={10}>
        <ProductOverviewCard product={product} />
      </Box>

      <Box as="section" py={20}>
        <ProductDetailsCard product={product} />
      </Box>

      <Box as="section" pb={20}>
        <ProductsGrid title="Related items" products={relatedProducts?.slice(0, 4)} />
      </Box>

      <Box as="section" pb={20}>
        <ProductsSlider title="More from this seller" products={fromThisSeller} />
      </Box>
    </Layout>
  );
};

export default ProductPage;
