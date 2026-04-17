export type PaymentMethod = "kakaopay" | "toss" | "bank_transfer";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Order = {
  id: string;
  user_id: string;
  items: OrderItem[];
  original_price: number;
  discount_price: number;
  total_price: number;
  payment_method: PaymentMethod; // 추가된 필드
  status: OrderStatus;
  address: string;
  postcode: string;
  detail_address: string;
  phone_number: string;
  secondary_phone?: string;
  created_at: string;
};
export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  name: string;
  price: number;
  original_price?: number;
  quantity: number;
  thumbnail: string;
  slug: string;
};
