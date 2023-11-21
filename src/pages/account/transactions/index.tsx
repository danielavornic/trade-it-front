import { barters } from "@/api";
import { AccountSidebar, BarterCard, Layout } from "@/components";
import { useAuth } from "@/hooks";
import { HStack, VStack, Card, CardBody, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const MyTransactions = () => {
  const { user } = useAuth();
  if (!user) {
    return null;
  }

  const { id } = user;

  const { data } = useQuery({
    queryKey: ["my-barters", id],
    queryFn: () => barters.getByUserId(Number(id)),
  });

  return (
    <Layout title="My transactions">
      <HStack as="section" mb={20} h="full" alignItems="start" justifyContent="space-between">
        <AccountSidebar />

        <VStack spacing={8} w="75%" alignItems="start">
          <Card shadow="sm " w="full" border="1px solid" borderColor="gray.100">
            <CardBody py={4}>
              <HStack spacing={4} justifyContent="space-between" alignItems="center">
                <Heading size="md" textAlign="left">
                  My Transactions
                </Heading>
              </HStack>
            </CardBody>
          </Card>

          <VStack w="full" alignItems="start" spacing={8}>
            {data?.map((barter) => <BarterCard barter={barter} key={barter.id} />)}
          </VStack>
        </VStack>
      </HStack>
    </Layout>
  );
};

export default MyTransactions;
