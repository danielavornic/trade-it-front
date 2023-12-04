import { Notification } from "@/types";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export const NotificationItem = ({ notification }: { notification: Notification }) => {
  const { title, message, barter_id } = notification;

  return (
    <Flex alignItems="center" gap={3} py={2}>
      <Box>
        <Text fontSize="sm" fontWeight="bold" mb={1}>
          {title}
        </Text>
        <Text fontSize="sm" mb={1}>
          {message}
        </Text>
      </Box>
      <Link href={`/account/transactions/${barter_id}`}>
        <Button ml="auto" size="sm">
          View
        </Button>
      </Link>
    </Flex>
  );
};
