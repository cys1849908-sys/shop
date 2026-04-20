"use server";
import { Address } from "@/src/types/address";
import { createClient } from "../supabase/server";

export async function addAddress(formData: any): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("로그인이 필요합니다.");

  if (formData.isDefault) {
    await supabase
      .from("addresses")
      .update({ isDefault: false })
      .eq("user_id", user.id);
  }

  const { error } = await supabase.from("addresses").insert([
    {
      ...formData,
      address_name: formData.addressName || formData.receiverName,
      user_id: user.id,
    },
  ]);

  if (error) {
    console.error("배송지 추가 실패:", error.message);
    throw new Error("배송지 저장 중 오류가 발생했습니다.");
  }
}

export async function deleteAddress(id: string): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("로그인이 필요합니다.");

  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("user_id", user.id)
    .eq("id", id);

  if (error) {
    console.error("배송지 삭제 실패:", error.message);
    throw new Error("배송지 삭제 중 오류가 발생했습니다.");
  }
}

export async function patchAddress(
  formData: Address,
  id: string,
): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("로그인이 필요합니다.");

  if (formData.isDefault) {
    await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", user.id);
  }

  const { error } = await supabase
    .from("addresses")
    .update({ ...formData })
    .eq("user_id", user.id)
    .eq("id", id);

  if (error) {
    console.error("배송지 수정 실패:", error.message);
    throw new Error("배송지 수정 중 오류가 발생했습니다.");
  }
}
