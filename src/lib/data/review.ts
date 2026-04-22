import { Review } from "@/src/types/review";
import { createClient } from "../supabase/server";

export async function getReviewsByProduct(
  productId: string,
): Promise<Review[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      id,
      productId: product_id,
      userId: user_id,
      rating,
      content,
      images,
      createdAt: created_at
    `,
    )
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data as Review[];
}

export async function getMyReviews(): Promise<Review[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      id,
      productId: product_id,
      userId: user_id,
      rating,
      content,
      reviewImages:review_images (
        url
      ),
      createdAt: created_at
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  const formattedData = (data as any[]).map((review) => ({
    ...review,
    images: review.reviewImages?.map((img: any) => img.url) || [],
  }));
  return formattedData as Review[];
}
