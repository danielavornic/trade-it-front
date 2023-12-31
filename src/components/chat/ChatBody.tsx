import { Message } from "@/components";
import { useAuth } from "@/hooks";
import { Message as MessageInterface } from "@/types";
import { VStack, Text, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { PuffLoader } from "react-spinners";

export const ChatBody = ({
  messages,
  isLoading,
}: {
  messages: MessageInterface[];
  isLoading: boolean;
}) => {
  useEffect(() => {
    const chatBody = document.getElementById("chat-body");
    if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
  }, [messages]);


  return (
    <VStack
      spacing="0px"
      alignItems="flex-start"
      overflowY="auto"
      maxH="calc(100vh - 200px)"
      px={8}
      my={-4}
      className="small-scrollbar"
      id="chat-body"
      h="full"
      backgroundSize="300px"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      {!messages || messages?.length === 0 ? (
        <Text color="gray.500" textAlign="center" mx="auto">                    
          No messages yet. Start typing!
        </Text>
      ) : (
        <>
          {messages.map((message, idx) => (
            <Message
              key={idx}
              messageText={message.text}
              senderId={message.sender?.id}
              timestamp={message.timestamp}
            />
          ))}
        </>
      )}
    </VStack>
  );
};
