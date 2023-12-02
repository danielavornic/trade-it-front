import { User } from "@/types";
import { Card, CardBody } from "@chakra-ui/react";

export const UserCard = ({ user }: { user: Partial<User> }) => {
  if (!user) return <Card shadow="sm" border="1px solid" borderColor="gray.100" width="20%"></Card>;

  const { name, surname, username, email, nr_tel } = user;

  // TODO: create user card
  return (
    <Card shadow="sm" border="1px solid" borderColor="gray.100" width="20%">
      <CardBody>{name}</CardBody>
    </Card>
  );
};
