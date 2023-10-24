import { useRouter } from "next/router";
import { Box, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { Product } from "@/types";
import { getProduct, getProducts } from "@/data";
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
  const product = await getProduct(Number(id));
  return {
    props: {
      product,
    },
  };
}

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isSuccess } = useQuery({
    queryKey: ["product", id],
    // queryFn: () => productsApi.getById(Number(id)),
    queryFn: () => getProduct(Number(id)),
  });

  const { data: products } = useQuery({
    queryKey: ["related-products"],
    // queryFn: () => productsApi.getList({ related_to:  Number(id) }),
    queryFn: getProducts,
  });

  return (
    <>
      <Layout title={data?.name || "Product"}>
        {isSuccess && (
          <>
            <Box as="section" pt={10}>
              <ProductOverviewCard product={data as Product} />
            </Box>

            <Box as="section" py={20}>
              <ProductDetailsCard product={data as Product} />
            </Box>

            <Box as="section" pb={20}>
              <Heading as="h2" size="lg" mb="4">
                Related items
              </Heading>
              <ProductsGrid products={products?.slice(0, 4)} />
            </Box>

            <Box as="section" pb={20}>
              <ProductsSlider title="More from this seller" products={products} />
            </Box>
          </>
        )}
      </Layout>
    </>
  );
};

export default ProductPage;
