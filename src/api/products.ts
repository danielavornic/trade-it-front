import { axios } from "@/lib";
import { Product, ProductAdd } from "@/types";

export const products = {
  getList: async (filters?: {
    category?: number | string;
    condition?: string;
    seller?: number;
    name?: string;
    related_to?: number;
    popular?: boolean;
  }): Promise<Product[]> => {
    const { data } = await axios.get("/products", { params: filters });
    return data.map((product: any) => productFactory(product));
  },
  add: async (product: ProductAdd): Promise<Product> => {
    const { data } = await axios.post("/products/add", product);
    return data;
  },
  getById: async (product_id: number): Promise<Product> => {
    const { data } = await axios.get(`/products/${product_id}`);
    return productFactory(data);
  },
};

const productFactory = (json: any): Product => {
  const params = typeof json === "object" ? json : {};

  return {
    id: params.id || 0,
    name: params.productName || "",
    description: params.description || "",
    img: params.imageURL[0] || "",
    category: {
      id: params.category.categoryId || 0,
      name: params.category.categoryName || "",
    },
    details: params.details || "",
    condition: params.condition || "",
    targetProducts: params.targetProducts || "",
    status: params.status || "",
    seller: {
      id: params.seller.id || 0,
      name: params.seller.name || "",
      username: params.seller.username || "",
    },
  };
};
