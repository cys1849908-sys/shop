interface UserAuth {
  email: string;
  isVerified: boolean;
  provider?: "email" | "google" | "kakao";
}

interface UserProfile {
  name: string;
  phone?: string;
}

export interface User {
  id: string;

  auth: UserAuth;
  profile: UserProfile;

  role: "user" | "admin" | "seller";

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface SignUpInput {
  email: string;
  password: string;

  name: string;
  phone?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
