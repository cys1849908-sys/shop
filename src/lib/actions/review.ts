"use server";

import { Review } from "@/src/types/review";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function createReview(
  formData: Omit<Review, "id" | "userId" | "createdAt" | "images"> & {
    imageFiles: File[];
    orderId: string;
  },
): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다.");

  const { data: reviewData, error: reviewError } = await supabase
    .from("reviews")
    .insert([
      {
        product_id: formData.productId,
        order_id: formData.orderId,
        user_id: user.id,
        rating: formData.rating,
        content: formData.content,
      },
    ])
    .select()
    .single();

  if (reviewError) {
    throw new Error(`리뷰 저장 실패: ${reviewError.message}`);
  }

  const reviewId = reviewData.id;

  if (formData.imageFiles && formData.imageFiles.length > 0) {
    for (const file of formData.imageFiles) {
      const fileName = `${formData.productId}/${Date.now()}-${file.name}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("reviews_images")
        .upload(fileName, file);

      if (uploadError) {
        console.error("Storage 업로드 에러:", uploadError.message);
        continue;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("reviews_images").getPublicUrl(uploadData.path);

      const { error: imageDbError } = await supabase
        .from("review_images")
        .insert([
          {
            review_id: reviewId,
            url: publicUrl,
          },
        ]);

      if (imageDbError) {
        console.error("이미지 DB 저장 에러:", imageDbError.message);
      }
    }
  }

  revalidatePath(`/mypage/order-list`);
}

export async function updateReview(
  reviewId: string,
  updateData: Pick<Review, "rating" | "content" | "images">,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "권한이 없습니다." };

  const { error } = await supabase
    .from("reviews")
    .update(updateData)
    .eq("id", reviewId)
    .eq("userId", user.id);

  if (error) return { error: error.message };

  revalidatePath("/my-page/reviews");
}

export async function deleteReview(reviewId: string, productId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "권한이 없습니다." };

  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId)
    .eq("userId", user.id);

  if (error) return { error: error.message };

  revalidatePath(`/products/${productId}`);
  revalidatePath("/my-page/reviews");
}
