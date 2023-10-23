type Condition = "NEW" | "USED" | "LIKE NEW";
type Status = "AVAILABLE" | "SWAPPED" | "PENDING";

interface Seller {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface City {
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
  city: City;
}
