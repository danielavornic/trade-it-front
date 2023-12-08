import { User } from "@/types";
import { Avatar, Card, HStack, Button, CardBody, Text, Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { FaComment, FaMapMarkerAlt } from "react-icons/fa";
// import { FontAwesomeIcon } from '@fontawesome/react-fontawesome';
// import { faComment } from '@fortawesome/free-regular-svg-icons';

export const UserCard = ({ user }: { user: Partial<User> }) => {
  if (!user) return <Card shadow="sm" border="1px solid" borderColor="gray.100" width="20%"></Card>;

  const { name, surname, username, id } = user;
  const location = "Chișinău, MD";

  const handleMessageClick = () => {
    console.log("Message button clicked");
  };

  // TODO: create user card
  return (
    <Card shadow="sm" border="1px solid" borderColor="gray.200" width="20%">
      <CardBody>
        <Flex align="center">
          <Avatar
            w="60px"
            h="60px"
            name={user.username}
            colorScheme="brand"
            bg="brand.500"
            color="white"
            mr={4}
            mb={6}
          />
          <Flex direction="column" mb={6}>
            <Text fontSize="lg" fontWeight={"bold"}>
              {username}
            </Text>
            <Text fontSize="lg">
              {name} {surname}
            </Text>
          </Flex>
        </Flex>
        <HStack spacing={2} mb={6}>
          <Box as={FaMapMarkerAlt} fontSize="xl" fontWeight="semibold" color="gray.500" />
          <Text fontSize="md" color="gray.500">
            {location}
          </Text>
        </HStack>
        <Flex justifyContent="center">
          <Link href={`/chat/${id}`} style={{ width: "100%" }}>
            <Button
              colorScheme="brand"
              variant="solid"
              color="white"
              bg="accent.500"
              width="100%"
              onClick={handleMessageClick}
            >
              <HStack spacing={2}>
                <FaComment fontSize="xl" fontWeight="semibold" color="gray.500" />
                <span>Message</span>
              </HStack>
            </Button>
          </Link>
        </Flex>
      </CardBody>
    </Card>
  );
};
