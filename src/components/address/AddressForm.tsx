"use client";

import { useForm } from "react-hook-form";
import Form from "@/src/components/common/ui/Form";
import Input from "@/src/components/common/ui/Input";
import FormRowVertical from "../common/ui/FormRowVertical";
import clsx from "clsx";
import React, { useEffect } from "react";
import { AddressInput, UpdateAddressRequest } from "@/src/types/address";

interface AddressFormProps {
  onSuccess: (data: any) => void;
  isFirstAddress?: boolean;
  initialData?: UpdateAddressRequest | null;
  title?: string;
  action?: (isValid: boolean) => React.ReactNode;
}

export default function AddressForm({
  onSuccess,
  isFirstAddress,
  initialData,
  title,
  action,
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    watch,
    formState: { errors, isValid },
  } = useForm<AddressInput>({
    mode: "onChange",
    defaultValues: initialData || {
      address_name: "",
      receiver_name: "",
      phone_number: "",
      secondary_phone: "",
      postcode: "",
      address: "",
      detail_address: "",
      is_default: false,
    },
  });

  // 필드명 변경 적용
  const watchedIsDefault = watch("is_default");

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSearchAddress = () => {
    if (!window.daum) {
      alert("주소검색 서비스를 불러오는 중입니다.");
      return;
    }
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        setValue("postcode", data.zonecode);
        setValue("address", data.address);
        setFocus("detail_address");
      },
    }).open();
  };

  return (
    <Form onSubmit={handleSubmit(onSuccess)}>
      <div className="w-[430px] bg-white flex flex-col ">
        {title && (
          <div className="flex items-center px-6 py-2 border-b border-gray-200">
            <span className="text-[14px] font-medium mx-auto">{title}</span>
          </div>
        )}
        <div className="px-6">
          <FormRowVertical label="배송지명">
            <Input
              placeholder="예: 우리집, 회사"
              {...register("address_name")}
            />
          </FormRowVertical>

          <FormRowVertical
            label="이름"
            required
            error={errors.receiver_name?.message}
          >
            <Input
              placeholder="수령인 이름을 입력해 주세요"
              {...register("receiver_name", { required: "이름은 필수입니다" })}
              error={!!errors.receiver_name?.message}
            />
          </FormRowVertical>

          <FormRowVertical
            label="연락처"
            required
            error={errors.phone_number?.message}
          >
            <Input
              type="tel"
              placeholder="연락처를 입력해 주세요"
              {...register("phone_number", {
                required: "연락처를 입력해주세요",
                pattern: {
                  value: /^01[0-9]-?\d{3,4}-?\d{4}$/,
                  message: "연락처가 정확한지 확인해 주세요.",
                },
              })}
              error={!!errors.phone_number?.message}
            />
          </FormRowVertical>

          <FormRowVertical label="추가 연락처">
            <Input
              placeholder="추가 연락처가 있으시다면 입력해 주세요"
              {...register("secondary_phone", {
                pattern: {
                  value: /^01[0-9]-?\d{3,4}-?\d{4}$/,
                  message: "연락처가 정확한지 확인해 주세요.",
                },
              })}
              error={!!errors.secondary_phone?.message}
            />
          </FormRowVertical>

          <FormRowVertical>
            <div className="space-y-1">
              <div className="relative">
                <p className="block w-full text-[14px]">주소</p>
                <div className="absolute w-[3px] h-[4px] top-1 left-7 rounded-sm border-red-500 bg-red-500 "></div>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="우편번호"
                  {...register("postcode")}
                  readOnly
                />
                <button
                  type="button"
                  className="bg-black text-white text-[12px] px-4 py-2 shrink-0 whitespace-nowrap cursor-pointer"
                  onClick={handleSearchAddress}
                >
                  주소찾기
                </button>
              </div>
              <Input placeholder="주소" readOnly {...register("address")} />

              <Input
                placeholder="상세주소"
                {...register("detail_address", {
                  required: "우편번호/주소/상세주소를 입력해주세요.",
                })}
                error={!!errors.detail_address?.message}
              />
            </div>
          </FormRowVertical>

          <div className="flex gap-1 items-center">
            <input
              className={clsx(
                "cursor-default",
                isValid && "accent-black cursor-pointer",
              )}
              type="checkbox"
              id="is_default"
              {...register("is_default")}
              disabled={!isValid}
              checked={isFirstAddress ? true : watchedIsDefault}
            />
            <label
              htmlFor="is_default"
              className={clsx(
                "text-[12px] cursor-default",
                watchedIsDefault && isValid ? "text-black" : "text-gray-500",
                isValid && "cursor-pointer",
              )}
            >
              기본배송지로 등록
            </label>
          </div>
        </div>

        <div className="p-5">
          {typeof action === "function" ? action(isValid) : action}
        </div>
      </div>
    </Form>
  );
}
