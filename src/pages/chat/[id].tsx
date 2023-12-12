import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { chat } from "@/api";
import { useAuth } from "@/hooks";
import { Message } from "@/types";
import { ChatHeader, ChatLayout, ChatBody, ChatFooter, isAuth } from "@/components";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

const filterDuplicatesById = (messages: any[]) => {
  const unique = new Set();
  const filtered = messages.filter((message) => {
    const duplicate = unique.has(message.messageId);
    unique.add(message.messageId);
    return !duplicate;
  });
  return filtered;
};

const ChatRoom = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState<any>(null);

  const [roomId, setRoomId] = useState(-1);
  const [chatroom, setChatRoom] = useState<any>(null);

  const fetchChatRoom = async () => {
    const res = await chat.getChatHistoryByTargetUserId(Number(user?.id), Number(id));
    setChatRoom(res);
    setMessages((prev) => filterDuplicatesById(res?.messages || []));
    setRoomId(res?.id || -1);
  };

  useEffect(() => {
    if (id) {
      fetchChatRoom();
    }
  }, [id, user, roomId]);

  useEffect(() => {
    const socket = new SockJS(process.env.NEXT_PUBLIC_SOCKET_BASE_URL as string);
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe(`/topic/${roomId}`, (message: any) => {
        const receivedMessage = JSON.parse(message.body);

        const mess = {
          id: receivedMessage.messageId,
          ...receivedMessage,
        };

        if (receivedMessage.roomId !== roomId) {
          setRoomId(receivedMessage.roomId);
        }

        if (messages.filter((m) => m.id === receivedMessage.messageId).length === 0) {
          setMessages((prev) => filterDuplicatesById([...(prev || []), mess]));
        }

        setMessages((prev) => filterDuplicatesById(prev || []));
      });
    });

    setStompClient(client);

    return () => {
      if (stompClient) stompClient?.disconnect();
    };
  }, [id, roomId]);

  const sendMessages = (message: Message) => {
    stompClient.send(`/app/sendMessage/${chatroom?.id ?? -1}`, {}, JSON.stringify(message));

    // if (roomId === -1) {
    //   fetchChatRoom();
    // }
  };

  const otherUser = chatroom?.targetUser;
  const chatRoomName = otherUser?.username || "";
  const fullName = otherUser?.name + " " + (otherUser?.surname ?? "");

  return (
    <ChatLayout title={chatRoomName} hasHeader hasFooter>
      <ChatHeader title={chatRoomName} description={fullName} />
      <ChatBody messages={messages} isLoading={false} />
      <ChatFooter
        sendMessage={sendMessages}
        roomId={roomId}
        message={message}
        setMessage={setMessage}
        targetUserId={Number(id)}
      />
    </ChatLayout>
  );
};

export default isAuth(ChatRoom);
