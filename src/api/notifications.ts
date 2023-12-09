import { axios } from "@/lib";

export const notifications = {
  getList: async (user_id: number): Promise<Notification[]> => {
    // const { data } = await axios.get("/notifications", {
    //   headers: {
    //     user_id,
    //   },
    // });
    const { data } = await axios.get(`/notifications/${user_id}`);
    return data.reverse();
  },
  markAsRead: async (user_id: number): Promise<void> => {
    // return await axios.patch(
    //   "/notifications/read",
    //   {},
    //   {
    //     headers: {
    //       user_id,
    //     },
    //   },
    // );
    return await axios.patch(`/notifications/${user_id}/read`);
  },
};
