"use client";
import clsx from "clsx";
import { useCartStore } from "@/src/store/CartStore";
import { CartItem } from "@/src/types/cart";
import { useOrderStore } from "@/src/store/OrderStore";

type Props =
  | {
      variant: "cart";
      totalAmount: number;
      selectedItems: CartItem[];
      handleCheckout: () => void;
    }
  | {
      variant: "order";
    };

export function PaymentInfo(props: Props) {
  const checkoutItems = useCartStore((state) => state.checkoutItems);
  const isValid = useOrderStore((state) => state.isValid);

  const isOrderable =
    props.variant === "cart"
      ? props.selectedItems.length > 0 && props.totalAmount > 0
      : isValid;

  const totalAmount =
    props.variant === "cart"
      ? props.totalAmount
      : checkoutItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );

  return (
    <div className="flex-1 border border-gray-200 h-fit sticky top-4 bg-white">
      <div className="p-5">
        <h3 className=" text-base pb-4 mb-4 border-b border-gray-100">
          {props.variant === "cart" ? "결제정보" : "최종 결제금액"}
        </h3>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">상품 금액</span>
            <span>{totalAmount.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between pb-4 border-b border-gray-100">
            <span className="text-gray-500">배송비</span>
            <span>무료배송</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">총 할인금액</span>
            <span className="text-red-500 ">-0원</span>
          </div>

          {props.variant === "order" && (
            <div className="pl-3 space-y-2 text-gray-400 text-[13px]">
              <div className="flex justify-between font-light">
                <span>상품 할인</span>
                <span>0원</span>
              </div>
            </div>
          )}

          <div className="flex justify-between items-end  border-t-2 border-black pt-5 mt-2">
            <span className="text-base">
              총 {props.variant === "cart" ? "주문" : "결제"}금액
            </span>
            <span className="text-2xl leading-none">
              {totalAmount.toLocaleString()}원
            </span>
          </div>

          {props.variant === "cart" && (
            <p className="flex justify-between text-xs border-t border-gray-200 pt-3">
              <span className="text-gray-500">적립예상 마일리지</span>
              <span className="text-blue-600">+360M</span>
            </p>
          )}

          {props.variant === "order" && (
            <p className="text-[11px] text-gray-400 leading-relaxed pt-2">
              위 주문 내용을 확인하였으며 결제 관련 서비스 약관에
              <button className="underline mx-1 text-gray-600">약관보기</button>
              동의합니다.
            </p>
          )}
        </div>
      </div>

      <button
        type={props.variant === "order" ? "submit" : "button"}
        form={props.variant === "order" ? "order-form" : undefined}
        className={clsx(
          "w-full py-3 text-[14px] text-center",
          isOrderable
            ? "bg-black text-white cursor-pointer"
            : "bg-gray-200 text-gray-500 cursor-default",
        )}
        disabled={!isOrderable}
        onClick={props.variant === "cart" ? props.handleCheckout : undefined}
      >
        {props.variant === "cart" ? "주문하기" : "결제하기"}
      </button>
    </div>
  );
}
