import { Product } from "@/src/types/product";
import { createClient } from "../supabase/server";

export async function getWishIds(): Promise<string[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("wishlists")
    .select("product_id")
    .eq("user_id", user.id);

  if (error) {
    console.error("위시 ID 로딩 실패:", error.message);
    return [];
  }

  return data.map((item) => item.product_id);
}

export async function getWishProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("wishlists")
    .select(
      `
      id,
      product:products!inner (
        *,
        thumbnail:product_images!inner (url)
      )
    `,
    )
    .eq("products.product_images.image_type", "thumbnail")
    .in("products.product_images.sort_order", [0, 1])
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("위시리스트 로딩 실패:", error.message);
    return [];
  }

  return data.map(({ id, product }: any) => ({
    ...product,
    thumbnail: product.thumbnail.map((img: { url: string }) => img.url),
    wishlistId: id,
  }));
}
