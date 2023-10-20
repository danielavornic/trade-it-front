import { Product } from "@/types";
import categoriesList from "./categories.json";
import productsList from "./products.json";

// mock data  for testing. categories has "data" property
export const getCategories = () => {
  return categoriesList;
};

export const getProducts = () => {
  return productsList as Product[];
};

export const getProduct = (id: number) => {
  return productsList.find((product) => product.id === id);
};
