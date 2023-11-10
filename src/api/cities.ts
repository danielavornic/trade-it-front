import { axios } from "@/lib";

export const cities = {
  getList: async (): Promise<any[]> => {
    const { data } = await axios.get("/cities");
    return data;
  },
};
