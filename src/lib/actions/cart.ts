"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { CartItem } from "@/src/types/cart";

export async function addToCart(item: CartItem): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다.");

  const { data: existing } = await supabase
    .from("carts")
    .select("id, quantity")
    .eq("user_id", user.id)
    .eq("product_id", item.product_id)
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
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        discount: item.discount,
        thumbnail: item.thumbnail,
        size: item.size,
        quantity: item.quantity,
        slug: item.slug,
      })
      .select();
  }

  revalidatePath("/cart");
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

  const updateData: { quantity: number; size?: string } = { quantity };
  if (newSize) updateData.size = newSize;

  await supabase
    .from("carts")
    .update(updateData)
    .eq("user_id", user.id)
    .eq("id", id);

  revalidatePath("/cart");
}

export async function removeItemsFromCart(ids: string[]): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || ids.length === 0) return;

  await supabase.from("carts").delete().eq("user_id", user.id).in("id", ids);

  revalidatePath("/cart");
}
