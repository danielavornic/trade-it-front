import { useState } from "react";
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

  const [isSaved, setIsSaved] = useState(false);

  const isGuest = user === null;
  const hasProduct = !isGuest && user.id === product.seller.id;
  const showBarterButtons = !isGuest && !hasProduct;

  return (
    <>
      <Card shadow="none" border="2px solid" borderColor="gray.200" minWidth="250px">
        <CardBody>
          <Stack>
            <Link href={`/users/${product.seller.id}`}>
              <HStack align="center">
                <Avatar bg="#0EB085" size="sm" />
                <Text fontSize="lg" ml={2}>
                  {product.seller.username}
                </Text>
              </HStack>
            </Link>
            <Divider my={2} />
            <HStack spacing={2} mb={2}>
              <Box as={FaMapMarkerAlt} fontSize="xl" fontWeight="semibold" color="gray.500" />
              <Text fontSize="md" color="gray.500">
                {location}
              </Text>
            </HStack>
            {isGuest ? (
              <Link href={{ pathname: "/signin", query: { redirectProductId: product.id } }}>
                <Button colorScheme="gray" borderColor="gray.300" variant="outline" color="#0EB085">
                  Sign in to start bartering
                </Button>
              </Link>
            ) : hasProduct ? (
              <Button
                colorScheme="gray"
                isDisabled
                title="This feature is not yet implemented"
                variant="outline"
                color="#0EB085"
              >
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
            <Button
              mt={4}
              leftIcon={<FaHeart />}
              minWidth="170px"
              width="100%"
              isDisabled
              title="This feature is not yet implemented"
              colorScheme={isSaved ? "brand" : "gray"}
              variant={isSaved ? "solid" : "outline"}
              color={isSaved ? "white" : "#0EB085"}
              onClick={() => setIsSaved(!isSaved)}
            >
              {isSaved ? "Saved for later" : "Save for later"}
            </Button>
          )}
        </CardBody>
      </Card>
      <BarterModal isOpen={isOpen} onClose={onClose} product={product as Product} />
    </>
  );
};
