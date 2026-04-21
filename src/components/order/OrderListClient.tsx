"use client";

import { useState } from "react";
import OrderGroup from "@/src/components/order/OrderGroup";
import { OrderWithItems } from "@/src/types/order";
import { SearchIcon } from "lucide-react";
import DateRange from "./DateRange";

export default function OrderListClient({
  initialOrders,
}: {
  initialOrders: OrderWithItems[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<string>("");

  const displayedOrders = initialOrders.filter((order) => {
    const matchesQuery = activeQuery
      ? order.orderItems?.some((item: any) =>
          item.name?.toLowerCase().includes(activeQuery.toLowerCase()),
        )
      : true;

    // const matchesDate = ... logic ...

    return matchesQuery;
  });

  const handleSearch = () => setActiveQuery(searchQuery);

  const handleReset = () => {
    setSearchQuery("");
    setActiveQuery("");
    setSelectedRange("");
  };

  return (
    <div className="w-full px-4 gap-6">
      <div className="w-[700px] mx-auto relative flex items-center gap-3 pb-10">
        <input
          autoFocus
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="어떤 상품을 찾으시나요?"
          className="w-full bg-transparent outline-none text-sm font-medium border-b pb-3"
        />
        <button
          onClick={handleSearch}
          className="absolute right-0 font-bold pb-3"
        >
          <SearchIcon />
        </button>
      </div>

      <div className="flex justify-between  border-black pb-4">
        <div className="flex items-center gap-2 text-[14px]">
          {activeQuery && (
            <span className="font-black italic">
              총 {displayedOrders.length}건의 내역
            </span>
          )}
          <span className="text-gray-400">|</span>
          <span className="text-gray-500 font-medium">
            2026-01-01 ~ 2026-04-20
          </span>
        </div>

        <div className="flex gap-2">
          {(searchQuery || selectedRange !== "all") && (
            <button
              onClick={handleReset}
              className="text-[12px] px-3 py-1 cursor-pointer"
            >
              초기화
            </button>
          )}
          <div className="relative">
            <button
              onClick={() => setIsDateOpen(!isDateOpen)}
              className="text-[12px] px-3 py-1 cursor-pointer border border-gray-200"
            >
              기간 조회
            </button>
            {isDateOpen && (
              <DateRange
                selectedRange={selectedRange}
                onSelect={setSelectedRange}
                onClose={() => setIsDateOpen(false)}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {displayedOrders.length === 0 ? (
          <div className="py-32 text-center border-b border-gray-200 text-gray-400 font-medium text-[15px]">
            조회된 주문 내역이 존재하지 않습니다.
          </div>
        ) : (
          displayedOrders.map((order) => (
            <OrderGroup key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
}
