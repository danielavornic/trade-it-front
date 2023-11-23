import { Avatar, Box, HStack, Heading, VStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { chat } from "@/api";
import { useAuth } from "@/hooks";
import { ChatRoomListItem } from "@/types";

export const ChatSidebar = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const { data, isSuccess } = useQuery({
    queryKey: ["chats"],
    queryFn: () => chat.getChatListByUserId(Number(user?.id) || 1),
  });

  return (
    <VStack
      width={["50%", "50%", "60%", "35%"]}
      h="100%"
      py={10}
      px={8}
      alignItems="flex-start"
      bg="white"
    >
      <HStack w="100%" justifyContent="space-between">
        <Heading as="h2" size="lg">
          My messages
        </Heading>
      </HStack>

      <VStack w="100%" spacing={4} alignItems="flex-start" mt={6} minH="70vh">
        {}
        {isSuccess && data.length === 0 ? (
          <Text color="gray.500">No chats found</Text>
        ) : isSuccess ? (
          <>
            {data.map((chat: ChatRoomListItem) => {
              const isActive = id === String(chat.id);
              const chatName =
                user?.id === chat.user1.id ? chat.user2.username : chat.user1.username;

              return (
                <Link key={chat.id} href={`/chat/${chat.id}`} passHref style={{ width: "100%" }}>
                  <HStack
                    w="100%"
                    bg={isActive || !chat.isRead ? "white" : "#fbfdfe"}
                    border="1px solid"
                    borderColor={isActive ? "accent.500" : "transparent"}
                    shadow={"sm"}
                    p={4}
                    borderRadius={8}
                    spacing={4}
                  >
                    <Avatar size="sm" name={chat.user1.username} bg="gray.500" color="white" />
                    <VStack spacing={1} alignItems="flex-start">
                      <HStack alignItems="center" spacing={2}>
                        {!chat.isRead && !isActive ? (
                          <Box w="8px" h="8px" borderRadius="50%" bg="accent.500" />
                        ) : null}
                        <Text
                          size="md"
                          fontWeight="bold"
                          color={chat.isRead && !isActive ? "gray.600" : "black"}
                        >
                          {chatName}
                        </Text>
                      </HStack>
                      <Text size="sm" color="gray.500">
                        {chat.lastMessage.text}
                      </Text>
                    </VStack>
                  </HStack>
                </Link>
              );
            })}
          </>
        ) : null}
      </VStack>
    </VStack>
  );
};
