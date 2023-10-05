import { Layout, ProductsGrid } from "@/components";
import { ProductDescriptionCard } from "@/components/product/ProductDescriptionCard";
import { ProductOverviewCard } from "@/components/product/ProductOverviewCard";
import { getProduct, getProducts } from "@/data";
import { Product } from "@/types";
import { Box, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isSuccess } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(Number(id)),
  });

  const { data: products } = useQuery({
    queryKey: ["related-products"],
    queryFn: getProducts,
  });

  return (
    <Layout>
      {isSuccess && (
        <>
          <Box as="section" pt={10}>
            <ProductOverviewCard product={data as Product} />
          </Box>

          <Box as="section" py={20}>
            <ProductDescriptionCard product={data as Product} />
          </Box>

          <Box as="section" pb={20}>
            <Heading as="h2" size="lg" mb="4">
              Related items
            </Heading>
            <ProductsGrid products={products} />
          </Box>
        </>
      )}
    </Layout>
  );
};

export default ProductPage;
