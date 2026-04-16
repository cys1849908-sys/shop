"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useModal } from "@/src/hooks/useModal";
import { useCartStore } from "@/src/store/CartStore";

import { Address } from "@/src/types/address";
import { shippingMessageOptions } from "@/src/constants/data/order";

import Input from "../common/ui/Input";
import OptionSelect from "../common/OptionSelect";
import CartItem from "../cart/CartItem";
import Modal from "../common/modals/Modal";
import FormRowVertical from "../common/ui/FormRowVertical";
import AddressManagement from "../address/AddressManagement";
import AddressCard from "../address/AddressCard";
import OrderPaymentMethods from "./OrderPaymentMethods";
import AddressAdder from "../address/AddressAdder";
import { UserInfo } from "@/src/types/user";

export default function OrderForm({
  addresses,
  user,
}: {
  addresses: Address[];
  user: UserInfo | null;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [option, setOption] = useState("직접 입력");
  const [manualSelected, setManualSelected] = useState<Address | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const checkoutItems = useCartStore((state) => state.checkoutItems);
  const selectedAddress = manualSelected ?? addresses?.[0] ?? null;

  const initialData = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone_number: user?.phone_number ?? "",
    secondary_phone: "",
    shipping_message: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: initialData || {},
  });

  const handleConfirmAddress = (selectedId: string) => {
    const found = addresses.find((a) => a.id === selectedId);
    if (found) setManualSelected(found);
    closeModal();
  };

  return (
    <div className="flex-2">
      <div>
        <h4>주문자 정보</h4>
        <hr />
        <div className="w-full">
          <div className="flex flex-col gap-2 w-[60%] py-4 px-6">
            <FormRowVertical label="주문자명" required>
              <Input
                placeholder="주문하시는 분의 이름을 입력해 주세요"
                {...register("name", {
                  required: "주문하시는 분의 이름을 입력해 주세요",
                })}
                error={!!errors.name}
                required
              />
            </FormRowVertical>

            <FormRowVertical label="연락처" required>
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
                error={!!errors.phone_number}
                required
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
                error={!!errors.secondary_phone}
              />
            </FormRowVertical>

            <div className="w-full border border-gray-200 my-7" />
          </div>
        </div>
      </div>

      <div>
        <h4>배송지정보</h4>
        <hr />
        <div className="w-[60%] py-4 px-6">
          {selectedAddress && (
            <AddressCard
              address={selectedAddress}
              actions={
                <button
                  className="bg-black text-[14px] text-white px-2 py-1 cursor-pointer"
                  onClick={openModal}
                >
                  변경
                </button>
              }
            />
          )}
          {addresses.length === 0 && (
            <div>
              <p className="text-[14px] pb-3">등록된 배송지가 없습니다</p>
              <AddressAdder />
            </div>
          )}
          <div className="py-4">
            <p className="text-[14px] ">요청사항</p>
            <div className="flex flex-col gap-2">
              <OptionSelect
                options={shippingMessageOptions}
                value={option}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                onChange={(val: string) => setOption(val)}
              />
              {option === "직접 입력" && (
                <Input
                  placeholder="요청사항을 직접 입력해 주세요"
                  {...register("shipping_message")}
                  autoFocus
                  error={!!errors.shipping_message}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4>주문상품 정보</h4>
        <hr />
        <div className="w-[60%] py-4 px-6">
          <div className="flex flex-col gap-4">
            {checkoutItems.map((item) => (
              <CartItem
                className="pointer-events-none"
                key={item.id}
                product={item}
                order
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 py-6 border-gray-200 border-t border-b">
          <span className="text-[12px] text-gray-500">
            사은품은 주문 상품과 별도로 배송될 수 있습니다.
          </span>
          <span className="text-[12px] text-gray-500">
            결제완료 이후 품절이 발생한 경우, 영업일 4일 이내 고객님께 별도로
            안내를 드립니다.
          </span>
          <span className="text-[12px] text-gray-500">
            품절 안내 이후 결제하신 금액은 자동취소 처리해 드리며, 재결제가
            필요한 경우 추가로 안내 드립니다.
          </span>
        </div>
      </div>

      <div>
        <h4>결제수단</h4>
        <hr />
        <div className="w-full py-4 px-6">
          <OrderPaymentMethods />
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} backdropBlur>
        <AddressManagement
          addresses={addresses}
          defaultAddressId={selectedAddress?.id ?? ""}
          onConfirm={handleConfirmAddress}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  );
}
