import { Address } from "@/src/types/address";
import { createClient } from "../supabase/server";

export async function getAddress(): Promise<Address[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("로그인이 필요합니다.");

  const { data, error } = await supabase
    .from("addresses")
    .select(
      `
      id,
      userId:user_id,
      addressName:address_name,
      receiverName:receiver_name,
      phoneNumber:phone_number,
      secondaryPhone:secondary_phone,
      postcode,
      address,
      detailAddress:detail_address,
      isDefault:is_default,
      createdAt:created_at
    `,
    )
    .eq("user_id", user.id)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("주소 불러오기 실패:", error.message);
    return [];
  }

  return data as Address[];
}
