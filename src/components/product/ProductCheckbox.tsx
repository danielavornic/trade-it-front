import { Product } from "@/types";
import { Button, Card, CardBody, HStack, Image, Radio, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

interface ProductCheckboxProps {
  product?: any;
  isChecked?: boolean;
  setIsChecked?: (value: boolean) => void;
  noCheckbox?: boolean;
}

export const ProductCheckbox = ({
  product,
  isChecked,
  setIsChecked,
  noCheckbox,
}: ProductCheckboxProps) => {
  if (!product) return null;

  const { id, name, img } = product;

  return (
    <Card
      direction="row"
      overflow="hidden"
      variant="outline"
      border={"2px"}
      borderColor={isChecked ? "brand.500" : "gray.200"}
      cursor={noCheckbox ? "default" : "pointer"}
      onClick={() => setIsChecked?.(true)}
      width="full"
    >
      <CardBody display="flex" gap={6} alignItems="center" padding={4}>
        {!noCheckbox && <Radio size="lg" name="1" colorScheme="brand" isChecked={isChecked} />}
        <Image
          src={img}
          alt={name}
          boxSize="60px"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
        />
        <HStack alignItems="start" justifyContent="space-between" width="100%" spacing={3}>
          <Text fontSize="lg" color="gray.800" fontWeight="bold">
            {name}
          </Text>
          <Link href={`/product/${id}`} target="_blank" rel="noopener noreferrer">
            <Button variant="solid" colorScheme="gray" size="sm">
              View
            </Button>
          </Link>
        </HStack>
      </CardBody>
    </Card>
  );
};
