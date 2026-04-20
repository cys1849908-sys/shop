import { createClient } from "../supabase/server";

export async function getReviews(
  type: "best-item-category" | "new-item-category" | "featured-category",
  category: string = "All",
): Promise<void> {
  const supabase = await createClient();

  let query = supabase
    .from("reviews")
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

  // if (error) {
  //   console.error(`${type} 상품 조회 에러:`, error);
  //   return [] as Product[];
  // }

  // return data.map((product) => ({
  //   ...product,
  //   thumbnail: product.thumbnail.map((img: { url: string }) => img.url),
  // }));
}
