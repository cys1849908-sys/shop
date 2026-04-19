"use client";

import { ChangeEvent, useState } from "react";
import Breadcrumb from "../Breadcrumb";
import OrderSteps from "../order/OrderSteps";
import { useAlert } from "@/src/hooks/useAlert";
import { PaymentInfo } from "../common/PaymentInfo";
import OrderLineItem from "../order/OrderLineItem";
import { useCartStore } from "@/src/store/CartStore";
import ConfirmModal from "../common/modals/ConfirmModal";
import { useRouter } from "next/navigation";

export default function CartClient() {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  const { setCheckoutItems } = useCartStore();
  const [selectedKeys, setSelectedKeys] = useState<string[]>(() =>
    cartItems.map((item) => item.id),
  );
  const { isAlertOpen, alertMessage, openAlert, confirm, cancel } = useAlert();

  const { removeItems } = useCartStore();

  const selectedItems = cartItems.filter((item) =>
    selectedKeys.includes(item.id),
  );
  const isAllChecked =
    cartItems.length > 0 && selectedKeys.length === cartItems.length;
  const handleToggleAll = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedKeys(e.target.checked ? cartItems.map((item) => item.id) : []);
  };
  const handleToggleItem = (id: string) => {
    setSelectedKeys((prev) =>
      prev.includes(id) ? prev.filter((key) => key !== id) : [...prev, id],
    );
  };

  const handleDelete = async (type: "single" | "multiple", key?: string) => {
    if (type === "single" && key) {
      await removeItems(key);
      setSelectedKeys((prev) => prev.filter((k) => k !== key));
    } else if (type === "multiple" && selectedKeys.length > 0) {
      const isConfirmed = await openAlert({
        title: type === "multiple" ? "선택 상품 삭제" : "상품 삭제",
        message: "정말로 삭제하시겠습니까?",
        isCancelActive: true,
      });

      if (!isConfirmed) return;
      await removeItems(selectedKeys);
      setSelectedKeys([]);
    }
  };
  const handleCheckout = () => {
    setCheckoutItems(selectedItems);
    router.push("/order-checkout");
  };

  return (
    <div className="w-full mx-auto p-6">
      <Breadcrumb />
      <OrderSteps />

      <div className="flex gap-8 mt-10">
        <div className="flex-[2]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 ">
              <input
                className="w-4 h-4 accent-black cursor-pointer"
                type="checkbox"
                id="all-select"
                checked={isAllChecked}
                onChange={handleToggleAll}
              />
              <label
                htmlFor="all-select"
                className="cursor-pointer text-[14px]"
              >
                전체선택
              </label>
            </div>
            <button
              onClick={() => handleDelete("multiple")}
              className="text-sm text-gray-500 hover:underline disabled:no-underline disabled:text-gray-300"
              disabled={selectedKeys.length === 0}
            >
              선택삭제
            </button>
          </div>
          <div className="border-b border-gray-200 mb-4"></div>

          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <div key={product.id} className="flex gap-4 mb-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-black cursor-pointer"
                  checked={selectedKeys.includes(product.id)}
                  onChange={() => handleToggleItem(product.id)}
                />
                <OrderLineItem
                  product={product}
                  handleDelete={handleDelete}
                  cart
                />
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-gray-500">
              장바구니가 비어있습니다.
            </div>
          )}
        </div>

        <div className="flex-1">
          <PaymentInfo
            variant="cart"
            selectedItems={selectedItems}
            handleCheckout={handleCheckout}
          />
        </div>
      </div>

      {isAlertOpen && (
        <ConfirmModal
          isOpen={isAlertOpen}
          message={alertMessage}
          onConfirm={confirm}
          onCancel={cancel}
        />
      )}
    </div>
  );
}
