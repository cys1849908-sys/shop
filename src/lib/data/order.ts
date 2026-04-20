"use server";

import { OrderWithItems } from "@/src/types/order";
import { createClient } from "../supabase/server";

export async function getOrderDetails(
  orderId: string,
): Promise<OrderWithItems> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("로그인이 필요합니다.");

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      originalPrice:original_price,
      discountPrice:discount_price,
      totalPrice:total_price,
      receiverName:receiver_name,
      phoneNumber:phone_number,
      secondaryPhone:secondary_phone,
      detailAddress:detail_address,
      shippingMessage:shipping_message,
      paymentMethod:payment_method,
      updatedAt:updated_at,
      orderItems:order_items (
      *,
      orderId:order_id,
      productId:product_id,
      unitPrice:unit_price,
      discountRate:discount_rate
      )
    `,
    )
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("주문 내역 조회 실패:", error.message);
  }

  return data as any;
}

export async function getOrderList(): Promise<OrderWithItems[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다.");
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      originalPrice:original_price,
      discountPrice:discount_price,
      totalPrice:total_price,
      receiverName:receiver_name,
      phoneNumber:phone_number,
      secondaryPhone:secondary_phone,
      detailAddress:detail_address,
      shippingMessage:shipping_message,
      paymentMethod:payment_method,
      updatedAt:updated_at,
      orderItems:order_items (
      *,
      orderId:order_id,
      productId:product_id,
      unitPrice:unit_price,
      discountRate:discount_rate
      )
    `,
    )
    .eq("user_id", user.id);

  if (error) {
    console.error("주문 내역 조회 실패:", error.message);
  }

  return data as OrderWithItems[];
}
