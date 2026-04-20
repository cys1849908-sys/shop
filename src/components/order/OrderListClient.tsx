"use client";

import { useState } from "react";
import clsx from "clsx";
import OrderGroup from "@/src/components/order/OrderGroup";
import { OrderWithItems } from "@/src/types/order";

export default function OrderListClient({
  initialOrders,
}: {
  initialOrders: OrderWithItems[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  // const filteredOrders = initialOrders.filter((order) =>
  //   order.order_items?.some((item: any) =>
  //     item.product_name?.toLowerCase().includes(searchQuery.toLowerCase()),
  //   ),
  // );
  console.log(initialOrders);
  // const orderItems = initialOrders.order_items;

  return (
    <div className="w-full px-4 gap-6">
      <div className="flex flex-col gap-4">
        <input
          className={clsx(
            "w-full w-[350px] border border-gray-300 p-3 text-[14px] outline-none focus:border-black",
          )}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="주문한 상품을 검색해주세요"
        />

        <div className="flex items-center justify-between border-b-2 border-black pb-4">
          <div className="flex items-center gap-2 text-[14px]">
            <span className="font-black italic">
              {/* TOTAL {filteredOrders.length}건 */}
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-500 font-medium">
              2026-01-01 ~ 2026-04-20
            </span>
          </div>

          <div className="flex gap-2">
            <div>
              <button
                onClick={() => setSearchQuery("")}
                className="text-[12px] px-3 py-1 "
              >
                초기화
              </button>
            </div>
            <div>
              <button className="text-[12px] px-3 py-1">기간 조회</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {initialOrders.length === 0 ? (
          <div className="py-32 text-center border-b border-gray-200 text-gray-400 font-medium text-[15px]">
            조회된 주문 내역이 존재하지 않습니다.
          </div>
        ) : (
          initialOrders.map((order) => {
            return <OrderGroup key={order.id} order={order} />;
          })
        )}
      </div>
    </div>
  );
}
