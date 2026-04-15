"use client";
import clsx from "clsx";
import { useCartStore } from "@/src/store/CartStore";
import { CartItem } from "@/src/types/cart";

export function PayMentinfo({
  totalAmount,
  selectedItems,
  handleCheckout,
}: {
  totalAmount: number;
  selectedItems: CartItem[];
  handleCheckout: () => void;
}) {
  const orderItem = { totalAmount, selectedItems };
  const isOrderable =
    orderItem.selectedItems.length > 0 && orderItem.totalAmount > 0;

  return (
    <div className="flex-1 border border-gray-200 h-fit sticky top-4 bg-white">
      <div className="p-4">
        <h3 className="text-[16px] pb-4 mb-4">결제정보</h3>
        <div className="space-y-3 text-[13px]">
          <div className="flex justify-between">
            <span className="text-gray-500">상품 금액</span>
            <span>{totalAmount.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">배송비</span>
            <span>무료배송</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">총 할인금액</span>
            <span className="text-red-300">-0원</span>
          </div>
          <div className="flex justify-between  border-t pt-4 mt-4">
            <span className="font-bold text-[16px]">총 주문금액</span>
            <span className="font-bold text-[16px]">
              {totalAmount.toLocaleString()}원
            </span>
          </div>
        </div>
        <p className="flex justify-between text-right border-t border-gray-200 text-xs mt-2 py-3 ">
          <span className="text-gray-500">적립예상 마일리지</span>
          <span className="text-blue-600">+360M</span>
        </p>
      </div>
      <button
        className={`w-full py-3 text-[14px] text-center ${
          isOrderable
            ? "bg-black text-white cursor-pointer"
            : "bg-gray-200 text-gray-500 cursor-default"
        }`}
        disabled={!isOrderable}
        onClick={handleCheckout}
      >
        주문하기
      </button>
    </div>
  );
}

export function FinalPaymentInfo() {
  const checkoutItems = useCartStore((state) => state.checkoutItems);

  const totalAmount = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="flex-1 border border-gray-200 h-fit sticky top-4 bg-white">
      <div className="p-5">
        <h3 className="font-bold text-lg pb-4 mb-4 border-b border-gray-100">
          최종 결제금액
        </h3>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">상품 금액</span>
            <span className="font-medium">
              {totalAmount.toLocaleString()}원
            </span>
          </div>
          <div className="flex justify-between pb-4 border-b border-gray-100">
            <span className="text-gray-500">배송비</span>
            <span className="font-medium">무료배송</span>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center group cursor-pointer">
              <span className="text-gray-600 flex items-center">
                총 할인금액 <span className="ml-1 text-[8px]">▼</span>
              </span>
              <span className="text-red-500 font-medium">-0원</span>
            </div>

            <div className="pl-3 space-y-2 text-gray-400 text-[13px]">
              <div className="flex justify-between font-light">
                <span>상품 할인</span>
                <span>0원</span>
              </div>
              {/* <div className="flex justify-between font-light">
                <span>쿠폰 할인</span>
                <span>0원</span>
              </div>
              <div className="flex justify-between font-light">
                <span>사용 마일리지</span>
                <span>0M</span>
              </div>
              <div className="flex justify-between font-light">
                <span>사용 포인트</span>
                <span>0P</span>
              </div> */}
            </div>
          </div>

          <div className="flex justify-between items-end font-bold border-t-2 border-black pt-5 mt-6">
            <span className="text-base">총 결제금액</span>
            <span className="text-2xl leading-none">
              {totalAmount.toLocaleString()}원
            </span>
          </div>

          <div className="pt-6 ">
            {/* <div className="pb-4 border-b border-gray-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500 font-medium">
                  총 마일리지 적립
                </span>
                <span className="text-blue-600 font-bold">
                  +2,580M 적립예정
                </span>
              </div>
              <p className="text-[10px] text-gray-400">
                리뷰 작성시 마일리지 증정(포토 1,000M/텍스트 500M)
              </p>
            </div> */}

            <p className="text-[11px] text-gray-400 leading-relaxed">
              위 주문 내용을 확인하였으며 결제 관련 서비스 약관에
              <button className="underline mx-1 text-gray-600">약관보기</button>
              동의합니다.
            </p>
          </div>
        </div>
      </div>

      <button
        className={clsx(
          "w-full bg-black text-white py-3 text-[14px] border-gray-100 cursor-pointer",
        )}
        // disabled={isVali}
      >
        결제하기
      </button>
    </div>
  );
}
