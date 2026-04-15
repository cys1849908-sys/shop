import { OrderItem, OrderStatus } from "@/src/types/order";
import { createClient } from "../supabase/server";

// 'handle' 대신 동작을 명확히 나타내는 이름으로 변경
export const createOrderAction = async (
  selectedItems: OrderItem[],
  totalPrice: number,
  address: string,
  phoneNumber: string,
) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다.");

  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      total_price: totalPrice,
      status: "pending" as OrderStatus,
      address: address,
      phone_number: phoneNumber,
    })
    .select()
    .single();

  if (orderError) {
    console.error("주문 생성 실패:", orderError.message);
    return { success: false, error: orderError.message };
  }

  const orderItemsToInsert = selectedItems.map((item) => ({
    order_id: orderData.id, // 방금 생성된 주문 ID 연결
    product_id: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    thumbnail: item.thumbnail,
    slug: item.slug,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItemsToInsert);

  if (itemsError) {
    console.error("주문 상세 생성 실패:", itemsError.message);
    return { success: false, error: itemsError.message };
  }

  return { success: true, orderId: orderData.id };
};
