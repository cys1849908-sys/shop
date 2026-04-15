"use client";

import Input from "@/src/components/common/ui/Input";
import Modal from "@/src/components/common/modals/Modal";
import { useModal } from "@/src/hooks/useModal";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default function UserInfoEditPage() {
  const [emailPrefix, setEmailPrefix] = useState("cys23568");
  const [emailDomain, setEmailDomain] = useState("kakao.com");
  const [isCustom, setIsCustom] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();

  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === "직접 입력") {
      setIsCustom(true);
      setEmailDomain("");
    } else {
      setIsCustom(false);
      setEmailDomain(value);
    }
  };
  return (
    <div className=" mx-auto p-4 text-[14px]">
      <div className="mb-12">
        <h4 className="text-lg font-bold mb-2">로그인 정보</h4>
        <hr className="border-black mb-6" />

        <div className="flex flex-col gap-6 px-4">
          <div className="flex items-center">
            <span className="w-32 font-medium text-gray-600">아이디</span>
            <span className="text-gray-900">cys23568@k</span>
          </div>

          <div className="flex items-start">
            <span className="w-32 font-medium text-gray-600 mt-1">
              비밀번호
            </span>
            <div className="flex flex-col gap-3">
              <span className="text-gray-900">********</span>
              <button
                className="px-4 py-2 border border-gray-300 text-gray-700 bg-white w-max cursor-pointer"
                onClick={openModal}
              >
                비밀번호 변경하기
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h4 className="text-lg font-bold mb-2">회원 정보</h4>
        <hr className="border-black mb-6" />

        <div className="flex flex-col gap-6 px-4">
          <div className="flex items-center">
            <span className="w-32 font-medium text-gray-600">이름</span>
            <span className="text-gray-900 font-semibold">최예성</span>
          </div>

          <div className="flex items-center">
            <span className="w-32 font-medium text-gray-600">생년월일</span>
            <span className="text-gray-900">1999년 08월 19일</span>
          </div>

          <div className="flex items-start">
            <span className="w-32 font-medium text-gray-600 mt-1">연락처</span>
            <div className="flex flex-col gap-3">
              <span className="text-gray-400">010-2799-5852</span>
              <button className="px-6 py-2 bg-black text-white font-bold hover:bg-gray-800 transition-colors">
                본인인증하고 정보 수정하기
              </button>
            </div>
          </div>

          <div className="flex items-start">
            <span className="w-32 font-medium text-gray-600 mt-2">
              이메일 <span className="text-red-500">*</span>
            </span>
            <div className="flex flex-col gap-2 w-full max-w-md">
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={emailPrefix}
                  onChange={(e) => setEmailPrefix(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-sm focus:outline-none"
                />
                <span className="text-gray-500">@</span>
                <Input
                  type="text"
                  value={emailDomain}
                  readOnly={!isCustom}
                  onChange={(e) => setEmailDomain(e.target.value)}
                  className={clsx(
                    "flex-1 p-2 border border-gray-300 rounded-sm focus:outline-none",
                    !isCustom && "bg-gray-50",
                  )}
                />
              </div>

              <select
                className="w-full p-2 border border-gray-300 rounded-sm bg-white text-gray-600 focus:outline-none"
                onChange={handleDomainChange}
                value={isCustom ? "직접 입력" : emailDomain}
              >
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="kakao.com">kakao.com</option>
                <option value="직접 입력">직접 입력</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-40 flex flex-col gap-8 items-center justify-center">
        <button className="border px-4 py-2 text-[14px]">확인</button>
        <button className="text-[13px] text-gray-500 underline">
          회원 탈퇴하기
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} backdropBlur>
        <div className="bg-white w-[430px]">
          <div className="flex items-center px-6 py-2 border-b border-gray-200">
            <span className="text-[14px] font-medium mx-auto">배송지 관리</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
