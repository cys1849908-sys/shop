export type UserRole = "user" | "admin" | "seller";
export type AuthProvider = "email" | "google" | "kakao";

export type User = {
  id: string;
  email: string;
  name: string;
  phone_number?: string;
  role: UserRole;
  provider: AuthProvider;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type SignUpInput = {
  email: string;
  password: string;
  name: string;
  phone_number?: string;
};

export type UserInfo = {
  email: string | null;
  name: string | null;
  phone_number: string | null;
};

export type LoginInput = Pick<SignUpInput, "email" | "password">;
