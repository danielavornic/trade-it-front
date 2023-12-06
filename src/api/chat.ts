import { axios } from "@/lib";
import { ChatRoom, ChatRoomListItem } from "@/types";

export const chat = {
  getChatListByUserId: async (userId: number): Promise<ChatRoomListItem[]> => {
    const { data } = await axios.get(`/chat/${userId}`);
    return data;
  },
  getChatHistoryByTargetUserId: async (userId: number, targetUserId: number): Promise<ChatRoom> => {
    const { data } = await axios.get(`/chat/${targetUserId}`, {
      headers: {
        user_id: userId,
      },
    });
    return data;
  },
};
