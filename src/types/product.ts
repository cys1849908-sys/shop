export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category_id: string;
  thumbnail: string[];
  images: string[];
  colors?: string[];
  sizes?: string[];
  slug: string;
  stock: number;
  discount?: number;
  is_new?: boolean;
};
