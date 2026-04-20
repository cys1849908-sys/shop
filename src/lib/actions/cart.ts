"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { CartItem } from "@/src/types/cart";
import { ERROR_MESSAGES } from "@/src/constants/messages";

const logError = (context: string, error: unknown) => {
  console.error(`[${context}]`, error instanceof Error ? error.message : error);
};

export async function addToCart(item: CartItem): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error(ERROR_MESSAGES.LOGIN_REQUIRED);

  try {
    const { data: existing } = await supabase
      .from("carts")
      .select("id, quantity")
      .eq("user_id", user.id)
      .eq("product_id", item.productId)
      .eq("size", item.size)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("carts")
        .update({ quantity: existing.quantity + item.quantity })
        .eq("id", existing.id);
    } else {
      await supabase
        .from("carts")
        .insert({
          user_id: user.id,
          product_id: item.productId,
          name: item.name,
          unit_price: item.unitPrice,
          discount_rate: item.discountRate,
          thumbnail: item.thumbnail,
          size: item.size,
          quantity: item.quantity,
          slug: item.slug,
        })
        .select();
    }

    revalidatePath("/cart");
  } catch (error) {
    logError(ERROR_MESSAGES.ADD_TO_CART_FAILED, error);
    throw new Error(ERROR_MESSAGES.ADD_TO_CART_FAILED);
  }
}

export async function updateCartItem(
  id: string,
  quantity: number,
  newSize?: string,
): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  try {
    const updateData: { quantity: number; size?: string } = { quantity };
    if (newSize) updateData.size = newSize;

    await supabase
      .from("carts")
      .update(updateData)
      .eq("user_id", user.id)
      .eq("id", id);

    revalidatePath("/cart");
  } catch (error) {
    logError(ERROR_MESSAGES.UPDATE_CART_FAILED, error);
    throw new Error(ERROR_MESSAGES.UPDATE_CART_FAILED);
  }
}

export async function removeItemsFromCart(ids: string[]): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || ids.length === 0) return;

  try {
    await supabase.from("carts").delete().eq("user_id", user.id).in("id", ids);

    revalidatePath("/cart");
  } catch (error) {
    logError(ERROR_MESSAGES.REMOVE_FROM_CART_FAILED, error);
    throw new Error(ERROR_MESSAGES.REMOVE_FROM_CART_FAILED);
  }
}
