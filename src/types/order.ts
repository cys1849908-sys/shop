export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  address: string;
  phoneNumber: string;
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
  slug: string;
};
