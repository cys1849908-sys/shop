"use client";

import React, { useState } from "react";
import Link from "next/link";
import Input from "@/src/components/common/ui/Input";
import { signUp } from "@/src/lib/actions/user";
import { useRouter } from "next/navigation";

type FormErrors = {
  password?: string;
  passwordConfirm?: string;
  email?: string;
  general?: string;
};

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState<FormErrors>({}); // 이건 분리해서 사용가능할듯
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 최소 8자리 이상이어야 합니다.";
    }
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const { name, email, password } = formData;
      const user = await signUp({ name, email, password });

      if (user) {
        router.replace("/#");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("already registered")) {
          setErrors({ email: "이미 사용 중인 이메일입니다." });
        } else {
          setErrors({
            general: "가입 중 오류가 발생했습니다: " + error.message,
          });
        }
      } else {
        setErrors({ general: "알 수 없는 오류가 발생했습니다." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // 입력 시 해당 필드 에러 초기화
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  return (
    <div className="flex min-h-screen items-start pt-30 justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 p-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            계정 만들기
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            정보를 입력하여 회원가입을 완료하세요.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="이름"
              name="name"
              placeholder="홍길동"
              required
              onChange={handleChange}
            />

            <div>
              <Input
                label="이메일"
                name="email"
                type="email"
                placeholder="example@mail.com"
                required
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <Input
                label="비밀번호"
                name="password"
                type="password"
                placeholder="8자 이상 입력"
                required
                onChange={handleChange}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <Input
                label="비밀번호 확인"
                name="passwordConfirm"
                type="password"
                placeholder="비밀번호 재입력"
                required
                onChange={handleChange}
              />
              {errors.passwordConfirm && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.passwordConfirm}
                </p>
              )}
            </div>
          </div>

          {errors.general && (
            <p className="text-sm text-red-500 text-center">{errors.general}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-black py-3 font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "처리 중..." : "가입하기"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/login"
            className="font-medium text-black hover:underline"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
