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
import { useMutation, useQuery } from "@tanstack/react-query";
import { notifications as notificationsApi } from "@/api";
import { useEffect, useState } from "react";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

const filterDuplicateNotifications = (notifications: Notification[]) => {
  const seen: any = {};
  return notifications.filter((notification) => {
    const previous = seen[notification.id];
    seen[notification.id] = true;
    return !previous;
  });
};

export const NotificationsHeader = () => {
  const { user } = useAuth();

  const [stompClient, setStompClient] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isRead, setIsRead] = useState(true);

  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationsApi.getList(Number(user?.id)),
    onSuccess: (data) => {
      console.log("data", data);
      setNotifications((prev: any) => filterDuplicateNotifications([...prev, ...data]));
      const unread = data.filter((notification: any) => notification.status === "UNREAD");
      if (unread.length > 0) {
        setIsRead(false);
      }
    },
  });

  const { mutate } = useMutation({
    mutationFn: () => notificationsApi.markAsRead(Number(user?.id)),
    onSuccess: () => {
      setNotifications((prev) => prev.map((notification) => ({ ...notification, status: "READ" })));
      setIsRead(true);
    },
  });

  useEffect(() => {
    const socket = new SockJS(process.env.NEXT_PUBLIC_SOCKET_BASE_URL as string);
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe(`/queue/notification/${user?.id}`, (notif: any) => {
        const receivedNotification = JSON.parse(notif.body);
        setNotifications((prev) => filterDuplicateNotifications([receivedNotification, ...prev]));
        setIsRead(false);
      });
    });

    setStompClient(client);

    return () => {
      if (stompClient) stompClient?.disconnect();
    };
  }, [user]);

  return (
    <Box position="relative" ml={4} mr={4}>
      {!isRead && (
        <Box
          position="absolute"
          right="0"
          top="0"
          boxSize="0.75em"
          bg="accent.500"
          rounded="full"
          zIndex={2}
        />
      )}
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="View notifications"
            icon={<FiBell />}
            rounded="full"
            onClick={() => {
              if (!isRead) {
                mutate();
              }
            }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody maxH={320} overflowY="auto" className="small-scrollbar">
            {notifications.length > 0 ? (
              notifications.map((notification: any, i) => (
                <>
                  <NotificationItem key={i} notification={notification} />
                  {i < notifications.length - 1 && <Divider />}
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
