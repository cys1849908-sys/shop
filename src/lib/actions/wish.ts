"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { ERROR_MESSAGES, TOAST_MESSAGES } from "@/src/constants/messages";

const logError = (context: string, error: unknown) => {
  console.error(`[${context}]`, error instanceof Error ? error.message : error);
};

export async function toggleWishlist(productId: string): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error(ERROR_MESSAGES.LOGIN_REQUIRED);

  try {
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
  } catch (error) {
    logError(ERROR_MESSAGES.WISHLIST_TOGGLE_FAILED, error);
    throw new Error(ERROR_MESSAGES.WISHLIST_TOGGLE_FAILED);
  }
}

export async function clearWishlist(): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error(ERROR_MESSAGES.LOGIN_REQUIRED);

  try {
    const { error } = await supabase
      .from("wishlists")
      .delete()
      .eq("user_id", user.id);

    if (error) throw error;

    revalidatePath("/mypage/wishlist");
    revalidatePath("/");
  } catch (error) {
    logError(ERROR_MESSAGES.WISHLIST_CLEAR_FAILED, error);
    throw new Error(ERROR_MESSAGES.WISHLIST_CLEAR_FAILED);
  }
}
