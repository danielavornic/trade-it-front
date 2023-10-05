import categoriesList from "./categories.json";
import productsList from "./products.json";

// mock data  for testing. categories has "data" property
export const getCategories = () => {
  return categoriesList;
};

export const getProducts = () => {
  return productsList;
};

export const getProduct = (id: number) => {
  return productsList.find((product) => product.id === id);
};
