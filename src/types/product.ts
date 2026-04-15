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
// export interface DiscountInfo {
//   product: string; // 할인 대상 상품명 또는 ID
//   discountRate: number; // 할인율 (예: 10)
//   startDate: string; // YYYY-MM-DD
//   endDate: string; // YYYY-MM-DD
// }
