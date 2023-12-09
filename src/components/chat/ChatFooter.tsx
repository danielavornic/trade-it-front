import { useAuth } from "@/hooks";
import { HStack, IconButton, Input } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { BsFillSendFill } from "react-icons/bs";

export const ChatFooter = ({ sendMessage, message, targetUserId, setMessage, roomId }: any) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    sendMessage({
      id: Number(roomId),
      message: String(message),
      senderId: Number(user?.id),
      targetUserId
    });

    queryClient.invalidateQueries(({ queryKey: ['chats'] }));

    setMessage("");
  };

  return (
    <HStack
      shadow="sm"
      as="form"
      px={4}
      mt={10}
      mb={6}
      mx={8}
      borderRadius="full"
      spacing={4}
      bg="white"
      justifyContent="space-between"
      justifySelf={"flex-end"}
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        border="none"
        outline="none"
        _focus={{ border: "none", outline: "none" }}
        _active={{ border: "none", outline: "none" }}
        variant="unstyled"
        height="100%"
        px={2}
        py={4}
      />

      <IconButton
        my={4}
        aria-label="Options"
        colorScheme="brand"
        icon={<BsFillSendFill />}
        borderRadius={8}
        type="submit"
        rounded="full"
      />
    </HStack>
  );
};
