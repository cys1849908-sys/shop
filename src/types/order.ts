export type PaymentMethod = "kakaopay" | "toss" | "bank_transfer";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderFormFields = {
  name: string;
  email: string;
  phone_number: string;
  secondary_phone: string;
  shipping_message: string;
};

export interface Order {
  id: string;
  user_id: string;
  receiver_name: string;
  email?: string;
  phone_number: string;
  secondary_phone?: string;
  original_price: number;
  discount_price?: number;
  total_price: number;
  payment_method: PaymentMethod;
  status: OrderStatus;
  address: string;
  postcode: string;
  detail_address: string;
  shipping_message: string;
  created_at: string;
  updated_at: string;
}
export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  name: string;
  unit_price: number;
  discount_rate?: number;
  quantity: number;
  subtotal: number;
  thumbnail: string;
  slug: string;
  size: string;
};
export type CreateOrderPayload = Omit<
  OrderWithItems,
  "id" | "user_id" | "status" | "created_at" | "updated_at"
>;
export type OrderError = {
  code: string;
  message: string;
  field?: keyof Order;
};

export interface OrderWithItems extends Order {
  order_items: OrderItem[];
}

export interface OrderStore {
  order: Order | null;
  isValid: boolean;
  setIsValid: (v: any) => void;
  // isLoading: boolean;
  // error: OrderError | null;
  // setOrder: (order: Order) => void;
  // setError: (error: OrderError | null) => void;
}
