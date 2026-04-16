import { Product } from "./product";

export type Wish = {
  id: string;
  user_id: string;
  product: Product;
  created_at: string;
};

export interface WishStore {
  wishedIds: Set<string>;
  setWishedIds: (ids: string[]) => void;
  toggle: (id: string) => Promise<void>;
  isWished: (id: string) => boolean;
  clearAll: () => Promise<void>;
}
