export type Wish = {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
};

export interface WishStore {
  wishedIds: Set<string>;
  setWishedIds: (ids: string[]) => void;
  toggle: (id: string) => Promise<void>;
  isWished: (id: string) => boolean;
  clearAll: () => Promise<void>;
}
