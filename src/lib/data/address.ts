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
    .select("*")
    .eq("user_id", user.id)
    .order("isDefault", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.log("주소 불러오기 실패", error.message);
    return [];
  }

  return data;
}
