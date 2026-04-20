export type UserRole = "user" | "admin" | "seller";
export type AuthProvider = "email" | "google" | "kakao";

export type User = {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  role: UserRole;
  provider: AuthProvider;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SignUpInput = {
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
};

export type UserInfo = {
  email: string | null;
  name: string | null;
  phoneNumber: string | null;
};

export type LoginInput = Pick<SignUpInput, "email" | "password">;
