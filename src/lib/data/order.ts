"use server";

import { Order, OrderWithItems } from "@/src/types/order";
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
      order_items (*)
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
      order_items (*)
    `,
    )
    .eq("user_id", user.id);

  if (error) {
    console.error("주문 내역 조회 실패:", error.message);
  }

  return data as OrderWithItems[];
}
