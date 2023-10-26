import Link from "next/link";
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

import { BarterModal } from "@/components";
import { useAuth } from "@/hooks";
import { Product } from "@/types";

export const SellerCard = ({ product }: { product: Product }) => {
  const location = "Chișinău, MD";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();

  const isGuest = user === null;
  const hasProduct = !isGuest && user.id === product.seller.id;
  const showBarterButtons = !isGuest && !hasProduct;

  return (
    <>
      <Card shadow="none" border="1px solid" borderColor="gray.200">
        <CardBody>
          <Stack>
            <HStack align="center">
              <Avatar bg="#0EB085" size="sm" />
              <Text fontSize="lg" ml={2}>
                {product.seller.username}
              </Text>
            </HStack>
            <Divider my={2} />
            <HStack spacing={2} mb={2}>
              <Box as={FaMapMarkerAlt} fontSize="xl" fontWeight="semibold" color="gray.500" />
              <Text fontSize="md" color="gray.500">
                {location}
              </Text>
            </HStack>
            {isGuest ? (
              <Link href={`/signin?next=${encodeURIComponent(`/product/${product.id}`)}`}>
                <Button colorScheme="gray" variant="outline" color="#0EB085">
                  Sign in to start bartering
                </Button>
              </Link>
            ) : hasProduct ? (
              <Button colorScheme="gray" variant="outline" color="#0EB085">
                Edit
              </Button>
            ) : (
              <Button
                onClick={onOpen}
                colorScheme="brand"
                variant="solid"
                color="white"
                bg="#0EB085"
              >
                Initiate Barter
              </Button>
            )}
          </Stack>
          {showBarterButtons && (
            <HStack justify="space-between" mt={4}>
              <Button leftIcon={<FaHeart />} colorScheme="gray" variant="outline" color="#0EB085">
                Save for Later
              </Button>
            </HStack>
          )}
        </CardBody>
      </Card>
      <BarterModal isOpen={isOpen} onClose={onClose} product={product as Product} />
    </>
  );
};
