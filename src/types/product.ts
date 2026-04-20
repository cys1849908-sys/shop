export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryId: string;
  thumbnail: string[];
  images: string[];
  colors?: string[];
  sizes?: string[];
  slug: string;
  stock: number;
  discount?: number;
  isNew?: boolean;
};
