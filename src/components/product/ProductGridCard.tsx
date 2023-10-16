import { Card, Stack, Heading, Image, CardBody } from "@chakra-ui/react";
import Link from "next/link";

import { Product } from "@/types";

export const ProductGridCard = ({ product }: { product: Product }) => {
  const { id, name, img } = product;

  return (
    <Link href={`/product/${id}`}>
      <Card
        shadow="sm"
        py={3}
        h="full"
        _hover={{ transform: "translateY(-4px)", color: "brand.500" }}
        transition="all 0.2s"
      >
        <CardBody bg="white">
          <Image src={img} alt={name} borderRadius="lg" bg="gray.50" />
          <Heading size="md" mt={6}>
            {name}
          </Heading>
        </CardBody>
      </Card>
    </Link>
  );
};
