"use server";
import { CreateOrderPayload } from "@/src/types/order";
import { createClient } from "../supabase/server";
import { calculateDisplayPrice } from "../utils";
import { revalidatePath } from "next/cache";

export async function createOrder(
  formData: CreateOrderPayload,
): Promise<string | undefined> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다.");

  const { data: orderData, error } = await supabase
    .from("orders")
    .insert([
      {
        user_id: user.id,
        receiver_name: formData.receiverName,
        email: formData.email,
        original_price: formData.originalPrice,
        discount_price: formData.discountPrice,
        total_price: formData.totalPrice,
        payment_method: formData.paymentMethod,
        status: "pending",
        address: formData.address,
        postcode: formData.postcode,
        detail_address: formData.detailAddress,
        phone_number: formData.phoneNumber,
        secondary_phone: formData.secondaryPhone,
        shipping_message: formData.shippingMessage,
      },
    ])
    .select("id")
    .single();

  if (error) {
    console.error("주문 생성 실패:", error.message);
  }
  const orderId = orderData?.id;

  const itemsToInsert = formData.orderItems.map((item) => {
    const finalUnitPrice = calculateDisplayPrice(
      item.unitPrice,
      item.discountRate,
    );
    const subtotal = finalUnitPrice * item.quantity;

    return {
      order_id: orderId,
      product_id: item.productId,
      name: item.name,
      unit_price: item.unitPrice,
      discount_rate: item.discountRate,
      quantity: item.quantity,
      subtotal: subtotal,
      thumbnail: item.thumbnail,
      slug: item.slug,
      size: item.size,
    };
  });
  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(itemsToInsert);
  if (itemsError) {
    console.error("주문 생성 실패:", itemsError.message);
  }
  const cartItemIds = formData.orderItems.map((i) => i.id);
  if (!user || cartItemIds.length === 0) return;

  try {
    await supabase
      .from("carts")
      .delete()
      .eq("user_id", user.id)
      .in("id", cartItemIds);
    revalidatePath("/cart");
  } catch (error) {
    // logError(ERROR_MESSAGES.REMOVE_FROM_CART_FAILED, error);
    // throw new Error(ERROR_MESSAGES.REMOVE_FROM_CART_FAILED);
    console.log("에러");
  }

  return orderId;
}
