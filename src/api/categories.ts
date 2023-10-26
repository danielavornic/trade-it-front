import { axios } from "@/lib";
import { Category } from "@/types";

export const categories = {
  getList: async () => {
    const { data } = await axios.get("/categories");
    return data.map((category: any) => categoryFactory(category));
  },
};

const categoryFactory = (json: any): Category => {
  const params = typeof json === "object" ? json : {};

  return {
    id: params.categoryId || 0,
    name: params.categoryName || "",
  };
};
