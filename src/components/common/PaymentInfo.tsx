"use client";

import clsx from "clsx";
import Link from "next/link";
import { CartItem } from "@/src/types/cart";
import { useCartStore } from "@/src/store/CartStore";
import { useOrderStore } from "@/src/store/OrderStore";
import { calculateDisplayPrice, formatCurrency } from "@/src/lib/utils";

type Props =
  | { variant: "cart"; selectedItems: CartItem[]; handleCheckout: () => void }
  | { variant: "order" }
  | {
      variant: "order-confirmation";
      summary: {
        originalPrice: number;
        totalPrice: number;
        discountPrice: number;
      };
    };

export function PaymentInfo(props: Props) {
  const isValid = useOrderStore((state) => state.isValid);
  const checkoutItems = useCartStore((state) => state.checkoutItems);

  const targetItems =
    props.variant === "cart" ? props.selectedItems : (checkoutItems ?? []);

  const summary = targetItems.reduce(
    (acc, item) => ({
      originalPrice: acc.originalPrice + item.price * item.quantity,
      totalPrice:
        acc.totalPrice +
        calculateDisplayPrice(item.price, item.discount) * item.quantity,
    }),
    { originalPrice: 0, totalPrice: 0 },
  );

  const discountPrice = summary.originalPrice - summary.totalPrice;

  const isOrderable =
    props.variant === "cart" ? props.selectedItems.length > 0 : isValid;

  const isConfirmation = props.variant === "order-confirmation";
  const isOrder = props.variant === "order";

  const totalLabel = isConfirmation
    ? "최종 결제금액"
    : isOrder
      ? "총 결제금액"
      : "총 주문금액";
  const headerLabel = isConfirmation
    ? "결제 금액"
    : isOrder
      ? "최종 결제금액"
      : "결제정보";

  return (
    <div
      className={clsx(
        "flex-1 border border-gray-200 h-fit bg-white",
        !isConfirmation && "sticky top-4",
      )}
    >
      <div className="p-5">
        <h3 className="text-base pb-4 mb-4 border-b border-gray-100">
          {headerLabel}
        </h3>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">총 상품 금액</span>
            <span>{formatCurrency(summary.originalPrice)}</span>
          </div>

          <div className="flex justify-between pb-4 border-b border-gray-100">
            <span className="text-gray-500">배송비</span>
            <span>무료배송</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">총 할인금액</span>
            <span className="text-red-500">
              {formatCurrency(discountPrice)}
            </span>
          </div>

          <div className="pl-3 space-y-2 text-gray-400 text-[13px]">
            <div className="flex justify-between font-light">
              <span>상품 할인</span>
              <span>{formatCurrency(discountPrice)}</span>
            </div>
          </div>

          <div className="flex justify-between items-end border-t-2 border-black pt-5 mt-2">
            <span className="text-base">{totalLabel}</span>
            <span className="text-2xl leading-none">
              {formatCurrency(summary.totalPrice)}
            </span>
          </div>

          {isOrder && (
            <p className="text-[11px] text-gray-400 leading-relaxed pt-2">
              위 주문 내용을 확인하였으며 결제 관련 서비스 약관에{" "}
              <button className="underline text-gray-600">약관보기</button>{" "}
              동의합니다.
            </p>
          )}
        </div>
      </div>

      {isConfirmation ? (
        <div>
          <p className="mt-4 text-right text-xs text-gray-500">
            결제수단: 신용카드 (현대카드 / 일시불)
          </p>
          <div className="mt-10 flex flex-col gap-3">
            <Link
              href="/orders"
              className="w-full py-4 bg-black text-white text-center font-bold text-lg hover:bg-zinc-800 transition-colors"
            >
              주문 내역 확인
            </Link>
            <Link
              href="/"
              className="w-full py-4 bg-white text-black text-center font-bold text-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              쇼핑 계속하기
            </Link>
          </div>
        </div>
      ) : (
        <button
          type={isOrder ? "submit" : "button"}
          form={isOrder ? "order-form" : undefined}
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
      )}
    </div>
  );
}
