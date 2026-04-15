"use server";

import { createClient } from "../supabase/server";

export async function signUp({
  email,
  password,
  name,
  phone,
}: {
  email: string;
  password: string;
  name: string;
  phone?: string;
}) {
  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        phone: phone,
      },
    },
  });

  if (authError) throw authError;

  return data.user;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (!email || !password) {
    throw new Error("이메일 혹은 비밀번호를 입력하지 않음");
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function verifyCurrentPassword({
  password,
}: {
  password: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    throw new Error("로그인이 필요합니다.");
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: password,
  });

  if (error) {
    throw new Error("현재 비밀번호가 일치하지 않습니다.");
  }

  return data;
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
