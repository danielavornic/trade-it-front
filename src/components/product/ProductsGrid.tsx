import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import { Grid, GridItem } from "@chakra-ui/react";
import { Product } from "@/types";
import { ProductGridCard } from "./ProductGridCard";

export const ProductsGrid = ({ products }: { products?: Product[] }) => {
  if (!products || products.length === 0) {
    return null;
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
  };

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
