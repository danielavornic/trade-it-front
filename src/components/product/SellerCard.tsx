import {
  Card,
  Button,
  Stack,
  Text,
  Avatar,
  Box,
  HStack,
  useDisclosure,
  CardBody,
  Divider,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { BarterModal } from "..";
import { Product } from "@/types";

export const SellerCard = ({ product }: { product: Product }) => {
  const location = "Chișinău, MD";
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card shadow="none" border="1px solid" borderColor="gray.200">
        <CardBody>
          <Stack>
            <HStack align="center">
              <Avatar bg="#0EB085" size="sm" />
              <Text fontSize="lg" ml={2}>
                {product.seller.name}
              </Text>
            </HStack>
            <Divider my={2} />
            <HStack spacing={2} mb={2}>
              <Box as={FaMapMarkerAlt} fontSize="xl" fontWeight="semibold" color="gray.500" />
              <Text fontSize="md" color="gray.500">
                {location}
              </Text>
            </HStack>
            <Button onClick={onOpen} colorScheme="brand" variant="solid" color="white" bg="#0EB085">
              Initiate Barter
            </Button>
          </Stack>
          <HStack justify="space-between" mt={4}>
            <Button leftIcon={<FaHeart />} colorScheme="gray" variant="outline" color="#0EB085">
              Save for Later
            </Button>
          </HStack>
        </CardBody>
      </Card>
      <BarterModal isOpen={isOpen} onClose={onClose} product={product as Product} />
    </>
  );
};
