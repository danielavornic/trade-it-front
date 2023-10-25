import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { ProductGridCard } from "./ProductGridCard";

export const ProductsGrid = ({ products }: { products?: any[] }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
      {products.map((product) => (
        <GridItem key={product.id}>
          <ProductGridCard product={product} />
        </GridItem>
      ))}
    </Grid>
  );
};