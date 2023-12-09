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

  const { data, isSuccess, isError } = useQuery({
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
      maxH="calc(100vh - 80px)"
      overflowY="auto"
    >
      <HStack w="100%" justifyContent="space-between">
        <Heading as="h2" size="lg">
          My messages
        </Heading>
      </HStack>

      <VStack w="100%" spacing={4} alignItems="flex-start" mt={6} minH="70vh">
        
        {(data?.length === 0 || isError) ? (
          <Text color="gray.500">No chats found</Text>
        ) : isSuccess ? (
          <>
            {data.map((chat: ChatRoomListItem) => {
              const isActive = id === String(chat.targetUser.id);

              return (
                <Link key={chat.id} href={`/chat/${chat.targetUser.id}`} passHref style={{ width: "100%" }}>
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
                    <Avatar size="sm" name={chat.targetUser.username} bg="gray.500" color="white" />
                    <VStack spacing={1} alignItems="flex-start">
                      <HStack alignItems="center" spacing={2}>
                        {/* {!chat.isRead && !isActive ? (
                          <Box w="8px" h="8px" borderRadius="50%" bg="accent.500" />
                        ) : null} */}
                        <Text
                          size="md"
                          fontWeight="bold"
                          color={chat.isRead && !isActive ? "gray.600" : "black"}
                        >
                          {chat.targetUser.username}
                        </Text>
                      </HStack>
                      <Text size="sm" color="gray.500">
                        {chat.messages[0].text}
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
