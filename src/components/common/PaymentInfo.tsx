"use client";
import clsx from "clsx";
import { CartItem } from "@/src/types/cart";
import { useOrderStore } from "@/src/store/OrderStore";
import { calculateDisplayPrice, formatCurrency } from "@/src/lib/utils";
import { useCartStore } from "@/src/store/CartStore";
type Props =
  | {
      variant: "cart";
      selectedItems: CartItem[];
      handleCheckout: () => void;
    }
  | { variant: "order" };

export function PaymentInfo(props: Props) {
  const isValid = useOrderStore((state) => state.isValid);
  const checkoutItems = useCartStore((state) => state.checkoutItems);

  const targetItems =
    props.variant === "cart" ? props.selectedItems : checkoutItems;

  const summary = (targetItems || []).reduce(
    (acc, item) => {
      const itemOriginal = item.price * item.quantity;
      const itemFinal =
        calculateDisplayPrice(item.price, item.discount) * item.quantity;

      return {
        originalPrice: acc.originalPrice + itemOriginal,
        totalPrice: acc.totalPrice + itemFinal,
      };
    },
    { originalPrice: 0, totalPrice: 0 },
  );

  const discountPrice = summary.originalPrice - summary.totalPrice;
  const isOrderable =
    props.variant === "cart" ? props.selectedItems?.length > 0 : isValid;
  props.variant === "cart" ? props.selectedItems.length > 0 : isValid;

  return (
    <div className="flex-1 border border-gray-200 h-fit sticky top-4 bg-white">
      <div className="p-5">
        <h3 className=" text-base pb-4 mb-4 border-b border-gray-100">
          {props.variant === "cart" ? "결제정보" : "최종 결제금액"}
        </h3>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">상품 금액</span>
            <span>{formatCurrency(summary.originalPrice)}</span>
          </div>
          <div className="flex justify-between pb-4 border-b border-gray-100">
            <span className="text-gray-500">배송비</span>
            <span>무료배송</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">총 할인금액</span>
            <span className="text-red-500 ">{discountPrice}원</span>
          </div>

          <div className="pl-3 space-y-2 text-gray-400 text-[13px]">
            <div className="flex justify-between font-light">
              <span>상품 할인</span>
              <span>{formatCurrency(discountPrice)}</span>
            </div>
          </div>

          <div className="flex justify-between items-end  border-t-2 border-black pt-5 mt-2">
            <span className="text-base">
              총 {props.variant === "cart" ? "주문" : "결제"}금액
            </span>
            <span className="text-2xl leading-none">
              {formatCurrency(summary.totalPrice)}
            </span>
          </div>

          {/* {props.variant === "cart" && (
            <p className="flex justify-between text-xs border-t border-gray-200 pt-3">
              <span className="text-gray-500">적립예상 마일리지</span>
              <span className="text-blue-600">+360M</span>
            </p>
          )} */}

          {props.variant === "order" && (
            <p className="text-[11px] text-gray-400 leading-relaxed pt-2">
              위 주문 내용을 확인하였으며 결제 관련 서비스 약관에
              <button className="underline text-gray-600">약관보기</button>
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
