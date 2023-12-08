import { axios } from "@/lib";
import { ChatRoom, ChatRoomListItem } from "@/types";

export const chat = {
  getChatListByUserId: async (user_id: number): Promise<ChatRoomListItem[]> => {
    const { data } = await axios.get("/chat", {
      headers: {
        user_id,
      },
    });
    return data;
  },
  getChatHistoryByTargetUserId: async (
    user_id: number,
    target_user_id: number,
  ): Promise<ChatRoom> => {
    const { data } = await axios.get(`/chat/${target_user_id}`, {
      headers: {
        user_id,
      },
    });
    return data;
  },
};
