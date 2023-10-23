// for icons: https://react-icons.github.io/react-icons
// din chakra components:
// https://chakra-ui.com/docs/components/card/usage
// https://chakra-ui.com/docs/components/avatar/usage
// https://chakra-ui.com/docs/components/button/usage
// https://chakra-ui.com/docs/components/text/usage

import { Card, Button, Stack, Text, Avatar, Box, HStack } from "@chakra-ui/react";
import { FaMapMarkerAlt, FaHeart } from "react-icons/fa";

export const SellerCard = ({ sellerUsername }: { sellerUsername: string }) => {
  // vedem de unde luam asa info de la back
  // textul cu verified seller lasam asa de forma
  const location = "Chișinău, MD";

  return (
    <Card p={4}>
      <Stack spacing={4}>
        <HStack align="center">
          <Avatar bg="#0EB085" size="lg">
            {/* Your avatar content here */}
          </Avatar>
          <Text ml={2}>{sellerUsername}</Text>
        </HStack>
        <HStack spacing={2}>
          <Box as={FaMapMarkerAlt} fontSize="lg" color="gray.500" />
          <Text>{location}</Text>
        </HStack>
        <Button colorScheme="teal" variant="solid" color="white" bg="#0EB085">
          Initiate Barter
        </Button>
      </Stack>
      <HStack justify="space-between" mt={4}>
        <Button leftIcon={<FaHeart />} colorScheme="gray" variant="outline" color="#0EB085">
          Save for Later
        </Button>
      </HStack>
    </Card>
  );
};