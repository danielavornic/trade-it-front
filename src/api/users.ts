import { axios } from "@/lib";
import { User } from "@/types";

export const users = {
  getById: async (user_id: number): Promise<User> => {
    const { data } = await axios.get(`/users/${user_id}`);
    return data;
  },
};
