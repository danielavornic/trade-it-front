import { axios } from "@/lib";
import { Product } from "@/types";

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
  }): Promise<{ data: Product[] }> => {
    return axios.get("/api/products", { params: filters });
  },
  add: (product: {
    seller_id: number;
    name: string;
    category_id: number;
    description: string;
    details: string;
    condition: string;
    targetProducts: string;
    city_id: number;

    token: string;
  }) => {
    return axios.post("/api/products", product, {
      headers: {
        Authorization: `Bearer ${product.token}`,
      },
    });
  },
  getById: (product_id: number): Promise<{ data: Product }> => {
    return axios.get(`/api/products/${product_id}`);
  },
};
