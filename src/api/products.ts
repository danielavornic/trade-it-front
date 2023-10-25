import { axios } from "@/lib";
import { Product, ProductAdd } from "@/types";

export const products = {
  getList: (filters: {
    category_id?: number;
    condition?: string;
    city_id?: number;
    seller_id?: number;
    name?: string;
    featured?: boolean;
    related_to?: number;
    popular?: boolean;
  }): Promise<Product[]> => {
    return axios.get("/api/products", { params: filters });
  },
  add: (product: ProductAdd): Promise<Product> => {
    return axios.post("/api/products", product, {
      // headers: {
      //   Authorization: `Bearer ${product.token}`,
      // },
    });
  },
  getById: (product_id: number): Promise<Product> => {
    return axios.get(`/api/products/${product_id}`);
  },
};
