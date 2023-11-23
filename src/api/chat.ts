import { axios } from "@/lib";
import { ChatRoom, ChatRoomListItem } from "@/types";

export const chat = {
  getChatListByUserId: async (userId: number): Promise<ChatRoomListItem[]> => {
    const { data } = await axios.get(`/chat/${userId}`);
    return data;
  },
  getChatHistoryByChatRoomId: async (chatRoomId: number): Promise<ChatRoom> => {
    const { data } = await axios.get(`/chat/history/${chatRoomId}`);
    return data;
  },
};
