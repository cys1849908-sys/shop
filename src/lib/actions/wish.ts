"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function toggleWishlist(productId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다.");

  const { data: existing } = await supabase
    .from("wishlists")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  if (existing) {
    const { error } = await supabase
      .from("wishlists")
      .delete()
      .eq("id", existing.id);

    if (error) throw error;
  } else {
    const { error } = await supabase.from("wishlists").insert({
      user_id: user.id,
      product_id: productId,
    });

    if (error) throw error;
  }

  revalidatePath("/wishlist");
  revalidatePath("/");

  return { success: true, isAdded: !existing };
}

export async function clearWishlist() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("로그인이 필요합니다.");

  const { error } = await supabase
    .from("wishlists")
    .delete()
    .eq("user_id", user.id);

  if (error) {
    console.error("위시리스트 전체 삭제 실패:", error.message);
    throw error;
  }
  revalidatePath("/mypage/wishlist");
  revalidatePath("/");

  return true;
}
