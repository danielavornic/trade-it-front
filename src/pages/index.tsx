import { useQuery } from "@tanstack/react-query";
import { Box, Heading } from "@chakra-ui/react";
import { Product } from "@/types";
import { getProducts } from "@/data";
import { Layout, ProductCategoriesBanner, ProductsGrid, ProductsSlider } from "@/components";

export default function Home() {
  const { data: products, isSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <Layout>
      <section>
        <ProductCategoriesBanner />
      </section>
      <Box as="section" pt={20}>
        <Heading as="h2" size="lg" mb="4">
          Popular products
        </Heading>
        <ProductsSlider products={products} />
      </Box>

      <Box as="section" py={20}>
        <Heading as="h2" size="lg" mb="4">
          Recommended items
        </Heading>
        <ProductsGrid products={products} />
      </Box>
    </Layout>
  );
}
