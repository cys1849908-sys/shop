import { Product } from "@/src/types/product";
import { createClient } from "../supabase/server";

export async function getProducts(
  type: "best-item-category" | "new-item-category" | "featured-category",
  category: string = "All",
): Promise<Product[]> {
  const supabase = await createClient();

  const columnMap: Record<typeof type, string> = {
    "best-item-category": "is_recommend",
    "new-item-category": "is_new",
    "featured-category": "is_featured",
  };

  const column = columnMap[type];

  let query = supabase
    .from("products")
    .select(
      `
      id, name, description, slug, stock, colors, sizes,
      categoryId:category_id,
      unitPrice:unit_price,
      discountRate:discount_rate,
      isNew:is_new,
      thumbnail:product_images!inner (url)
    `,
    )
    .eq(column, true)
    .eq("product_images.image_type", "thumbnail")
    .order("created_at", { ascending: false })
    .limit(10);

  if (category !== "All") {
    query = query.eq("category_id", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error(`${type} 상품 조회 에러:`, error.message);
    return [];
  }

  return (data as any[]).map((product) => ({
    ...product,
    thumbnail: product.thumbnail.map((img: { url: string }) => img.url),
    images: product.images || [],
  })) as Product[];
}

export async function getProductDetail(slug: string): Promise<Product | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id, name, description, slug, stock, colors, sizes,
      categoryId:category_id,
      unitPrice:unit_price,
      discountRate:discount_rate,
      isNew:is_new,
      thumbnail:product_images!inner (url),
      images:product_images!inner (url)
    `,
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
    thumbnail: data.thumbnail?.map((img: any) => img.url) || [],
    images: data.images?.map((img: any) => img.url) || [],
  } as Product;
}

export async function getProductSearch(query: string): Promise<Product[]> {
  if (!query.trim()) return [];
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id, name, description, slug, stock, colors, sizes,
      categoryId:category_id,
      unitPrice:unit_price,
      discountRate:discount_rate,
      isNew:is_new,
      thumbnail:product_images!inner (url)
    `,
    )
    .ilike("name", `%${query}%`)
    .eq("product_images.image_type", "thumbnail")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("상품 검색 에러:", error.message);
    return [];
  }

  return (data as any[]).map((product) => ({
    ...product,
    thumbnail: product.thumbnail.map((img: { url: string }) => img.url),
    images: [], // 검색 목록에서는 상세 이미지가 보통 필요 없으므로 빈 배열 처리
  })) as Product[];
}
