export interface BarterOffer {
  offered_product_id: number;
  desired_product_id: number;
  message: string;
}

export enum BarterStatus {
  Accepted = "accepted",
  Declined = "declined",
  Pending = "pending",
  CompletionPending = "completion_pending",
  Completed = "completed",
  Cancelled = "cancelled",
}

export interface Barter {
  id: number;
  offered_by: User;
  requested_from: User;
  status: BarterStatus;
  initiated_at: string; // ISO 8601 date format
  last_updated: string; // ISO 8601 date format
  message: string;
  first_to_complete_id?: number;
}

interface User {
  user_id: number;
  username: string;
  product: Product;
}

interface Product {
  product_id: number;
  name: string;
  imageURL: string;
}
