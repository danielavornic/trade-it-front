import React from "react";
import { Grid, GridItem, Heading, Text } from "@chakra-ui/react";

import { Product } from "@/types";
import { ProductGridCard } from "@/components";

interface Props {
  title?: string;
  products?: Product[];
  cols?: number;
}

export const ProductsGrid = ({ title, products, cols }: Props) => {
  if (!products || products.length === 0) {
    return <Text>No products found.</Text>;
  }

  return (
    <>
      {title && (
        <Heading as="h2" size="xl" mb="4">
          {title}
        </Heading>
      )}
      <Grid templateColumns={`repeat(${cols || 3}, 1fr)`} gap={6} width="full">
        {products.map((product) => (
          <GridItem key={product.id}>
            <ProductGridCard product={product} />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
