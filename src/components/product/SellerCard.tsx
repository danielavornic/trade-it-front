// for icons: https://react-icons.github.io/react-icons
// din chakra components:
// https://chakra-ui.com/docs/components/card/usage
// https://chakra-ui.com/docs/components/avatar/usage
// https://chakra-ui.com/docs/components/button/usage
// https://chakra-ui.com/docs/components/text/usage

import { Card, Button, Stack, StackDivider, Text, Avatar, Box } from "@chakra-ui/react";
import { FaMapMarkerAlt, FaHeart } from "react-icons/fa";

export const SellerCard = ({ sellerUsername }: { sellerUsername: string }) => {
  // vedem de unde luam asa info de la back
  // textul cu verified seller lasam asa de forma
  const location = "Chișinău, MD";

  return (
    <Card>
      <Stack spacing={4}>
        <Avatar bg="#0EB085">
          {/*avatar content here*/}
        </Avatar>
        <Text>{sellerUsername}</Text>
        <Stack direction="row" spacing={2}>
          <Box as={FaMapMarkerAlt} fontSize="lg" color="gray.500" />
          <Text>{location}</Text>
        </Stack>
        <Button colorScheme="#0EB085" variant="solid">
          Initiate Barter
        </Button>
        <Stack direction="row" spacing={2}>
          <Box as={FaHeart} fontSize="lg" color="#0EB085" />
          <Button colorScheme="gray" variant="outline" color="#0EB085">
            Save for Later
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};
