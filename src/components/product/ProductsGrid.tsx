import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import { Product } from "@/types";
import { ProductGridCard } from "@/components";

export const ProductsGrid = ({ products, cols }: { products?: Product[]; cols?: number }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Grid templateColumns={`repeat(${cols || 4}, 1fr)`} gap={6}>
      {products.map((product) => (
        <GridItem key={product.id}>
          <ProductGridCard product={product} />
        </GridItem>
      ))}
    </Grid>
  );
};
