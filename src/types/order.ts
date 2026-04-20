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
  phoneNumber: string;
  secondaryPhone: string;
  shippingMessage: string;
};

export interface Order {
  id: string;
  userId: string;
  receiverName: string;
  email?: string;
  phoneNumber: string;
  secondaryPhone?: string;
  originalPrice: number;
  discountPrice?: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  address: string;
  postcode: string;
  detailAddress: string;
  shippingMessage: string;
  createdAt: string;
  updatedAt: string;
}
export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  name: string;
  unitPrice: number;
  discountRate?: number;
  quantity: number;
  subtotal: number;
  thumbnail: string;
  slug: string;
  size: string;
};
export type CreateOrderPayload = Omit<
  OrderWithItems,
  "id" | "userId" | "status" | "createdAt" | "updatedAt"
>;
export type OrderError = {
  code: string;
  message: string;
  field?: keyof Order;
};

export interface OrderWithItems extends Order {
  orderItems: OrderItem[];
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
