import { Flex, VStack, Icon, Heading, Text } from "@chakra-ui/react";
import { PiWechatLogoLight } from "react-icons/pi";
import { ChatLayout, isAuth } from "@/components";

const Chat = () => {
  return (
    <ChatLayout title="Chat">
      <Flex w="100%" h="100%" p={8} rounded="md" alignItems="center" justifyContent="center">
        <VStack spacing={4} alignItems="center">
          <Icon as={PiWechatLogoLight} w={28} h={28} color="brand.500" mb={8} mt={-10} />
          <Heading as="h1" size="lg">
            Your messages
          </Heading>
          <Text fontSize="lg" textAlign="center" color="gray.700" mb={4}>
            Pick a chat from the sidebar and start discussing barter offers!
          </Text>
        </VStack>
      </Flex>
    </ChatLayout>
  );
};

export default isAuth(Chat);
