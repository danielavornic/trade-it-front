import { axios } from "@/lib";
import { UserWithPassword } from "@/types";

export const auth = {
  login: (credentials: { username: string; password: string }) => {
    return axios.post("/auth/login", credentials);
  },
  logout: () => {
    return axios.post("/auth/logout");
  },
  signup: (credentials: UserWithPassword) => {
    return axios.post("/auth/register", credentials);
  },
};
