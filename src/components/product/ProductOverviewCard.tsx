import {
  Card,
  HStack,
  Image,
  Box,
  Text,
  VStack,
  Spacer,
  SliderFilledTrack,
} from "@chakra-ui/react";
import { Product } from "@/types";
import { SellerCard } from "./SellerCard";

export const ProductOverviewCard = ({ product }: { product: Product }) => {
  // Check Product interface for more details
  const { id, name, description, seller, category, condition, status, targetProducts, img } =
    product;

  return (
    <Card shadow="none" border="1px solid" borderColor="gray.200" borderRadius="md" p={2}>
      <HStack justify="space-between">
        <Image
          border="1px solid"
          borderColor="gray.200"
          src={img}
          alt={name}
          margin="20px"
          width="400px"
          height="400px"
          objectFit="cover"
          borderRadius="md"
        />
        <VStack p={2} align="start" spacing={2}>
          <Box border="1px solid" borderColor="gray.200" margin="0 auto" padding={10}>
            <Text fontSize="xl" fontWeight="bold">
              {name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {category.name}
            </Text>
            <Text fontSize="sm">{description}</Text>
          </Box>
        </VStack>
        <Spacer />
        <Box border="1px solid" borderColor="gray.200" margin="0 auto" padding={10}>
          <SellerCard sellerUsername={SliderFilledTrack.name} />
        </Box>
      </HStack>
    </Card>
  );
};
