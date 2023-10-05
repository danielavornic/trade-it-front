type Condition = "NEW" | "USED" | "LIKE NEW";
type Status = "AVAILABLE" | "SWAPPED" | "SOLD";

export interface Product {
  id: number;
  name: string;
  description: string;
  sellerName: string;
  category: string;
  condition: Condition;
  status: Status;
  targetProduct?: string;
  img?: string;
}

export interface Category {
  id: number;
  name: string;
}
