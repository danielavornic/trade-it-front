import { Card, Stack, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";

import { Product } from "@/types";

export const ProductGridCard = ({ product }: { product: Product }) => {
  const { id, name, img } = product;

  return (
    <Link href={`/product/${id}`}>
      <Card shadow="sm">
        <Image src={img} alt={name} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
        </Stack>
      </Card>
    </Link>
  );
};
