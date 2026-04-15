import { Product } from "./product";

export type Wish = {
  id: string;
  userId: string;
  product: Product;
  createdAt: string;
};

export interface WishStore {
  wishedIds: Set<string>;
  setWishedIds: (ids: string[]) => void;
  toggle: (id: string) => Promise<void>;
  isWished: (id: string) => boolean;
  clearAll: () => Promise<void>;
}
