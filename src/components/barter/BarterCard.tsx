import { useAuth } from "@/hooks";
import { Barter, BarterStatus } from "@/types";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";

export const BarterCard = ({ barter }: { barter: Barter }) => {
  const { id, initiated_at, requested_from, offered_by, status } = barter;
  const { user } = useAuth();

  const isSeller = user?.id === requested_from.user_id;

  const formattedDate = new Date(initiated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusColor =
    status === BarterStatus.Pending
      ? "orange"
      : status === BarterStatus.Cancelled || status === BarterStatus.Declined
      ? "red"
      : "green";

  return (
    <HStack justifyContent="space-between" width="full" spacing={8}>
      <Card width="85%" flex="auto" shadow="sm">
        <CardBody>
          <HStack justifyContent="flex-start" spacing={16}>
            <Box position="relative" height="100%">
              <Box position="relative" zIndex={2}>
                <Image
                  src={requested_from.product.imageURL}
                  alt={requested_from.product.name}
                  bg="gray.100"
                  mt="20px"
                  width="160px"
                  rounded="md"
                />
              </Box>
              <Box position="absolute" top="0" right="-20px" opacity={0.7}>
                <Image
                  src={offered_by.product.imageURL}
                  alt={offered_by.product.name}
                  bg="gray.100"
                  width="160px"
                  rounded="md"
                />
              </Box>
            </Box>
            <VStack spacing={4} alignItems="start">
              <Text fontSize="2xl" fontFamily="poppins" fontWeight="bold">
                {offered_by.product.name} for {requested_from.product.name}
              </Text>

              <Text fontSize="md" color="gray.500">
                {formattedDate}
              </Text>
              <Text fontSize="md" color="gray.500">
                Initiated by {isSeller ? requested_from.username : "you"}
              </Text>
            </VStack>
          </HStack>
        </CardBody>
      </Card>

      <VStack width="15%" flex="auto" spacing={4} alignItems="start">
        <Heading size="sm" textAlign="left">
          Transaction #{id}
        </Heading>

        <Badge colorScheme={statusColor}>{status.replace("_", " ")}</Badge>

        <Link href={`/account/transactions/${id}`}>
          <Button colorScheme="brand" size="sm">
            View details
          </Button>
        </Link>
      </VStack>
    </HStack>
  );
};
