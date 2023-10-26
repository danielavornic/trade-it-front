export type Condition = "NEW" | "USED" | "LIKE NEW";
export type Status = "AVAILABLE" | "SWAPPED" | "PENDING";

export interface Seller {
  id: number;
  name: string;
  username: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  seller: Seller;
  name: string;
  category: Category;
  description: string;
  details: string;
  status: Status;
  img: string;
  condition: Condition;
  targetProducts: string;
  city?: City;
}

export interface ProductAdd {
  seller_id: number;
  name: string;
  category_id: number;
  description: string;
  details: string;
  condition: string;
  targetProducts: string;
}
