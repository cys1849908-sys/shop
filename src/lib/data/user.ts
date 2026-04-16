import { UserInfo } from "@/src/types/user";
import { createClient } from "../supabase/server";

export async function getUserInfo(): Promise<UserInfo | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("users")
    .select("email, name, phone_number")
    .eq("id", user.id)
    .single();

  if (error || !data) return null;

  return data as UserInfo;
}
