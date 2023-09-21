type Condition = "NEW" | "USED" | "LIKE NEW";
type Status = "AVAILABLE" | "SWAPPED" | "SOLD";

export interface Product {
  id: number;
  name: string;
  description: string;
  sellerName: number;
  category: number;
  condition: Condition;
  status: Status;
  targetProduct?: string;
  img?: string;
}
