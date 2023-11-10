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

  // From java backend
  // return {
  //   id: params.categoryId || 0,
  //   name: params.categoryName || "",
  // };

  return {
    id: params.id || 0,
    name: params.name || "",
  };
};
