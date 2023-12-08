import { axios } from "@/lib";

export const notifications = {
  getList: async (user_id: number): Promise<Notification[]> => {
    const { data } = await axios.get("/notifications", {
      headers: {
        user_id,
      },
    });
    return data;
  },
};
