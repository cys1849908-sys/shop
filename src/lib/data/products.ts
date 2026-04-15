import { Product } from "@/src/types/product";
import { createClient } from "../supabase/server";

export async function getProducts(
  type: "best-item-category" | "new-item-category" | "featured-category",
  category: string = "All",
): Promise<Product[]> {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select(
      `
      *,
      thumbnail:product_images!inner (url)
    `,
    )
    .eq("product_images.image_type", "thumbnail")
    .in("product_images.sort_order", [0, 1])
    .limit(10);

  const columnMap: Record<typeof type, string> = {
    "best-item-category": "is_recommend",
    "new-item-category": "is_new",
    "featured-category": "is_featured",
  };

  const column = columnMap[type];
  query = query.eq(column, true);

  if (category !== "All") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error(`${type} 상품 조회 에러:`, error);
    return [] as Product[];
  }

  return data.map((product) => ({
    ...product,
    thumbnail: product.thumbnail.map((img: { url: string }) => img.url),
  }));
}

export async function getProductDetail(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      `*,
      images:product_images!inner (url)`,
    )
    .eq("slug", slug)
    .eq("product_images.image_type", "detail")
    .single();

  if (error) {
    console.error("제품 상세 정보를 불러오는 중 에러 발생:", error.message);
    return null;
  }
  return {
    ...data,
    images: data.images.map((img: { url: string }) => img.url),
  };
}

export async function getProductSearch(q: string): Promise<Product[]> {
  if (!q.trim()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      thumbnail:product_images!inner (url)
    `,
    )
    .ilike("name", `%${q}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("상품 검색 에러:", error.message);
    return [];
  }

  return data.map((product) => ({
    ...product,
    thumbnail: product.thumbnail.map((img: { url: string }) => img.url),
  }));
}
