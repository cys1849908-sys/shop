"use client";

import { formatCurrency } from "@/src/lib/utils";
import OrderLineItem from "./OrderLineItem";

export default function OrderItemCard({ order }: { order: any }) {
  const orderItems = order.orderItems;

  return (
    <div className="mb-10 border border-gray-200 bg-white">
      <div className="flex justify-between items-center bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex gap-6">
          <div className="flex flex-col">
            <span className="text-[14px] ">
              {new Date(order.updated_at)
                .toLocaleDateString()
                .replace(/\./g, "-")
                .slice(0, -1)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px]  underline  underline-offset-1">
              {order.id.split("-")[0].toUpperCase()}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[16px]  text-black">
            {formatCurrency(order.totalPrice)}
          </div>
        </div>
      </div>

      <div className="flex flex-col px-6 py-4 ">
        {orderItems.map((item: any, index: number) => (
          <OrderLineItem product={item} key={item | index} readOnly order />
        ))}
      </div>
    </div>
  );
}
