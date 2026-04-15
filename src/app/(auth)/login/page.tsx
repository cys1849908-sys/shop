"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Form from "@/src/components/common/ui/Form";
import FormRowVertical from "@/src/components/common/ui/FormRowVertical";
import Input from "@/src/components/common/ui/Input";
import { login } from "@/src/lib/actions/user";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");

  const [email, setEmail] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    const savedCheck = localStorage.getItem("saveEmail");
    const savedEmail = localStorage.getItem("email");
    return savedCheck === "true" && savedEmail ? savedEmail : "";
  });

  const [saveEmail, setSaveEmail] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("saveEmail") === "true";
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });

      if (saveEmail) {
        localStorage.setItem("email", email);
        localStorage.setItem("saveEmail", "true");
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("saveEmail");
      }

      router.replace("/#");
    } catch (err) {
      console.error("실패");
    }
  };

  return (
    <div className="flex min-h-screen items-start pt-30 justify-center bg-white ">
      <div className="w-full max-w-md bg-white p-10 ">
        <h1 className="text-2xl font-semibold text-center mb-8">로그인</h1>
        <Form onSubmit={handleSubmit}>
          <FormRowVertical label="">
            <Input
              type="email"
              id="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
            />
          </FormRowVertical>

          <FormRowVertical label="">
            <Input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />
          </FormRowVertical>

          <button
            type="submit"
            className="w-full py-3 bg-black text-white text-[11px]  "
          >
            로그인
          </button>

          <div className="flex justify-between items-center text-sm text-black mt-1 mb-4">
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="saveEmail"
                  className="accent-black"
                  checked={saveEmail}
                  onChange={() => setSaveEmail(!saveEmail)}
                />
                이메일 저장하기
              </label>
            </div>

            <div className="flex gap-3 ">
              <Link href="/find-id" className="cursor-pointer">
                아이디 찾기
              </Link>
              <Link href="/find-password" className="cursor-pointer">
                비밀번호 찾기
              </Link>
            </div>
          </div>
        </Form>

        <div className="flex flex-col gap-2">
          <div className="text-center px-4 py-2 text-[12px] text-gray-600 border border-gray-200">
            <Link href="/signup" className="cursor-pointer">
              회원가입
            </Link>
          </div>
          <div className="text-center px-4 py-2 text-[12px] text-gray-600 border border-gray-200">
            <Link href="/signup" className="cursor-pointer">
              회원가입
            </Link>
          </div>
          <div className="text-center px-4 py-2 text-[12px] text-gray-600 border border-gray-200">
            <Link href="/signup" className="cursor-pointer">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
