import {
  Box,
  Divider,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";

import { Notification } from "@/types";
import { NotificationItem } from "@/components";
import { useAuth } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { notifications } from "@/api";

const notificationsL: Notification[] = [
  {
    id: 1,
    type: "barter_update", // or "barter_proposed"
    barter_id: 123456,
    title: "Barter Proposal Update",
    message: "Your barter proposal for the 'Camera' with seller123 has been accepted.",
    status: "unread", // Can be "unread", "read"
    timestamp: "2023-11-07T16:00:00Z",
  },
  {
    id: 2,
    type: "barter_proposed",
    barter_id: 123456,
    title: "Barter Proposal",
    message: "seller123 has proposed a barter for the 'Camera'.",
    status: "unread",
    timestamp: "2023-11-07T16:00:00Z",
  },
  {
    id: 3,
    type: "barter_update",
    barter_id: 123456,
    title: "Barter Proposal Update",
    message: "Your barter proposal for the 'Camera' with seller123 has been accepted.",
    status: "read",
    timestamp: "2023-11-07T16:00:00Z",
  },
  {
    id: 4,
    type: "barter_proposed",
    barter_id: 123456,
    title: "Barter Proposal",
    message: "seller123 has proposed a barter for the 'Camera'.",
    status: "read",
    timestamp: "2023-11-07T16:00:00Z",
  },
];

export const NotificationsHeader = () => {
  const { user } = useAuth();

  // const { data } = useQuery({
  //   queryKey: ["notifications"],
  //   queryFn: () => notifications.getList(Number(user?.id)),
  // });

  return (
    <Box position="relative" ml={4} mr={4}>
      {/* TODO: add notifications */}
      <Box
        position="absolute"
        right="0"
        top="0"
        boxSize="0.75em"
        bg="accent.500"
        rounded="full"
        zIndex={2}
      />
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton aria-label="View notifications" icon={<FiBell />} rounded="full" />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody maxH={320} overflowY="auto" className="small-scrollbar">
            {notificationsL?.length > 0 ? (
              notificationsL.map((notification, i) => (
                <>
                  <NotificationItem key={i} notification={notification} />
                  {i < notificationsL.length - 1 && <Divider />}
                </>
              ))
            ) : (
              <Box w="full" h="full" p={3} textAlign="center">
                No notifications yet
              </Box>
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
