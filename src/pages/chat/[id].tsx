import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import { chat } from "@/api";
import { useAuth } from "@/hooks";
import { Message } from "@/types";
import { ChatHeader, ChatLayout, ChatBody, ChatFooter, isAuth } from "@/components";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

const ChatRoom = () => {
  const router = useRouter();
  const { id } = router.query;

  const { user } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState<any>(null);

  const { data: serverMessages, isLoading } = useQuery({
    queryKey: ["chats-history", id, stompClient],
    queryFn: () => chat.getChatHistoryByTargetUserId(Number(user?.id), Number(id)),
  });

  useEffect(() => {
    setMessages(serverMessages?.messages || []);
  }, [serverMessages]);

  // useEffect(() => {
  //   const socket = new SockJS(process.env.NEXT_PUBLIC_SOCKET_BASE_URL as string);
  //   const client = Stomp.over(socket);

  //   client.connect({}, () => {
  //     client.subscribe(`/topic/${id}`, (message: any) => {
  //       const receivedMessage = JSON.parse(message.body);
  //       const mess = {
  //         senderId: receivedMessage.senderId,
  //         senderName: receivedMessage.sender,
  //         messageText: receivedMessage.messageText,
  //         timestamp: receivedMessage.timestamp,
  //       };
  //       setMessages((prev) => [...(prev || []), mess]);
  //     });
  //   });

  //   setStompClient(client);

  //   return () => {
  //     if (stompClient) stompClient.disconnect();
  //   };
  // }, [id, router.locale]);

  const sendMessages = (message: Message) => {
    stompClient.send(`/app/sendMessage/${id}`, {}, JSON.stringify(message));
  };

  const otherUser = serverMessages?.targetUser;
  const chatRoomName = otherUser?.username || "";
  const fullName = otherUser?.name + " " + otherUser?.surname;

  return (
    <ChatLayout title={chatRoomName} hasHeader hasFooter>
      <ChatHeader title={chatRoomName} description={fullName} />
      <ChatBody messages={messages} isLoading={isLoading} />
      <ChatFooter sendMessage={sendMessages} message={message} setMessage={setMessage} />
    </ChatLayout>
  );
};

export default isAuth(ChatRoom);
