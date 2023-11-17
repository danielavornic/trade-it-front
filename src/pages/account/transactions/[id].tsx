import { barters } from "@/api";
import { AccountSidebar, Layout, ProductCheckbox } from "@/components";
import { useAuth } from "@/hooks";
import { Barter, BarterStatus, Product } from "@/types";
import { HStack, Box, Card, CardBody, Heading, VStack, Text, Button } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";

const emptyBarter: Barter = {
  id: 0,
  offered_by: {
    user_id: 0,
    username: "",
    product: {
      product_id: 0,
      name: "",
      imageURL: "",
    },
  },
  requested_from: {
    user_id: 0,
    username: "",
    product: {
      product_id: 0,
      name: "",
      imageURL: "",
    },
  },
  initiated_at: "",
  last_updated: "",
  message: "",
  status: BarterStatus.Pending,
  first_to_complete_id: 0,
};

const TransactionPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const id = Number(router.query.id);

  const { data: barter } = useQuery({
    queryKey: ["barter", id],
    queryFn: () => barters.getById(Number(id)),
  });

  const { offered_by, requested_from, initiated_at, message, status, first_to_complete_id } =
    barter || emptyBarter;

  const isSeller = user?.id === requested_from.user_id;

  const offeredProduct = {
    id: offered_by.product.product_id,
    name: offered_by.product.name,
    img: offered_by.product.imageURL,
  };

  const requestedProduct = {
    id: requested_from.product.product_id,
    name: requested_from.product.name,
    img: requested_from.product.imageURL,
  };

  const formattedDate = new Date(initiated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const { mutate } = useMutation({
    mutationFn: (status: BarterStatus) => barters.updateStatus(id, status, Number(user?.id)),
  });

  return (
    <Layout title={`Transaction #${router.query.id}`}>
      <HStack as="section" mb={20} h="full" alignItems="start" justifyContent="space-between">
        <AccountSidebar />

        <VStack spacing={8} w="75%" alignItems="start">
          <Card shadow="sm " w="full" border="1px solid" borderColor="gray.100">
            <CardBody py={4}>
              <HStack spacing={4} justifyContent="space-between" alignItems="center">
                <Heading size="md" textAlign="left">
                  Transaction #{id}
                </Heading>

                <Text fontSize="md" color="gray.500">
                  {formattedDate}
                </Text>
              </HStack>
            </CardBody>
          </Card>

          <VStack spacing={8} w="full" alignItems="start">
            <VStack spacing={4} w="full" alignItems="start">
              <Heading as="h2" size="md" color="gray.600">
                Requested product from{" "}
                {isSeller ? (
                  "you"
                ) : (
                  <Link href={`/users/${requested_from.user_id}`}>{requested_from.username}</Link>
                )}
              </Heading>
              <ProductCheckbox product={requestedProduct} noCheckbox />
            </VStack>

            <VStack spacing={4} w="full" alignItems="start">
              <Heading as="h2" size="md" color="gray.600">
                Offered product by{" "}
                {!isSeller ? (
                  "you"
                ) : (
                  <Link href={`/users/${offered_by.user_id}`}>{offered_by.username}</Link>
                )}
              </Heading>
              <ProductCheckbox product={offeredProduct} noCheckbox />
            </VStack>

            {message && (
              <VStack spacing={4} w="full" alignItems="start">
                <Heading as="h2" size="md" color="gray.600">
                  Message
                </Heading>

                <Text color="gray.500">
                  <Text as="span" fontWeight="bold">
                    {!isSeller ? "You" : requested_from.username}:{" "}
                  </Text>{" "}
                  {message}
                </Text>
              </VStack>
            )}
          </VStack>

          <HStack justifyContent="flex-end">
            {status === BarterStatus.Declined && (
              <>
                <Button isDisabled colorScheme="brand">
                  Declined
                </Button>
              </>
            )}

            {status === BarterStatus.Pending && !isSeller && (
              <>
                <Button isDisabled colorScheme="brand">
                  Pending response...
                </Button>
                <Button colorScheme="red" onClick={() => mutate(BarterStatus.Cancelled)}>
                  Cancel
                </Button>
              </>
            )}

            {status === BarterStatus.Pending && isSeller && (
              <>
                <Button colorScheme="brand" onClick={() => mutate(BarterStatus.Accepted)}>
                  Accept
                </Button>
                <Button colorScheme="red">Decline</Button>
              </>
            )}

            {status === BarterStatus.Accepted && (
              <>
                <Button colorScheme="brand" onClick={() => mutate(BarterStatus.CompletionPending)}>
                  Mark as complete
                </Button>
                <Button colorScheme="red">Cancel</Button>
              </>
            )}

            {status === BarterStatus.CompletionPending && first_to_complete_id === user?.id && (
              <Button isDisabled colorScheme="brand">
                Completion pending...
              </Button>
            )}

            {status === BarterStatus.CompletionPending && first_to_complete_id !== user?.id && (
              <Button colorScheme="brand" onClick={() => mutate(BarterStatus.Completed)}>
                Complete
              </Button>
            )}

            {status === BarterStatus.Completed && (
              <Button isDisabled colorScheme="brand">
                Completed
              </Button>
            )}
          </HStack>
        </VStack>
      </HStack>
    </Layout>
  );
};

export default TransactionPage;
