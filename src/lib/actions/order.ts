import { Order } from "@/src/types/order";
import { createClient } from "../supabase/server";

export async function createOrder(formData: Order): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다.");

  const { data: orderData, error } = await supabase
    .from("orders")
    .insert([
      {
        user_id: formData.user_id,
        items: formData.items,
        original_price: formData.original_price,
        discount_price: formData.discount_price,
        total_price: formData.total_price,
        payment_method: formData.payment_method,
        status: "pending",
        address: formData.address,
        postcode: formData.postcode,
        detail_address: formData.detail_address,
        phone_number: formData.phone_number,
        secondary_phone: formData.secondary_phone,
      },
    ])
    .select("id")
    .single();

  if (error) {
    console.error("주문 생성 실패:", error.message);
  }

  const orderId = orderData?.id;

  const itemsToInsert = formData.items.map((item) => ({
    order_id: orderId,
    product_id: item.product_id,
    original_price: item.original_price,
    quantity: item.quantity,
    name: item.name,
    price: item.price,
    slug: item.slug,
    thumbnail: item.thumbnail,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(itemsToInsert);

  if (itemsError) {
    console.error("주문 생성 실패:", itemsError.message);
  }
}
