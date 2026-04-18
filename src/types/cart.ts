export type CartItem = {
  id: string;
  product_id: string;
  name: string;
  price: number;
  discount?: number;
  thumbnail: string;
  size: string;
  quantity: number;
  slug: string;
};

export interface CartStore {
  items: CartItem[];
  checkoutItems: CartItem[];

  setCheckoutItems: (items: CartItem[]) => void;
  addItem: (item: CartItem | CartItem[]) => Promise<void>;
  removeItems: (ids: string | string[]) => Promise<void>;
  updateItem: (params: UpdateParams) => Promise<void>;
  initializeItems: (items: CartItem[]) => void;
}

export type UpdateParams = {
  id: string;
  quantity?: number;
  size?: string;
};
