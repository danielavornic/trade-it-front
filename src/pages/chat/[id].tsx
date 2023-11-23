import { chat } from "@/api";
import { ChatHeader, ChatLayout, ChatBody, ChatFooter } from "@/components";
import { useAuth } from "@/hooks";
import { Message } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// import SockJS from "sockjs-client";
// import Stomp from "stompjs";

const ChatRoom = () => {
  const router = useRouter();
  const { id } = router.query;
  const locale = router.locale as string;

  const { user } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState<any>(null);

  const {
    data: serverMessages,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["chats-history", id, stompClient],
    queryFn: () => chat.getChatHistoryByChatRoomId(Number(id)),
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

  const otherUser =
    serverMessages?.user1.id === user?.id ? serverMessages?.user2 : serverMessages?.user1;
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

export default ChatRoom;
