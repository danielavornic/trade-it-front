export { default as products } from "./products.json";
// export { default as categoriesList } from "./categories.json";
import categoriesList from "./categories.json";

// mock data  for testing. categories has "data" property
export const getCategories = () => {
  return categoriesList;
};
