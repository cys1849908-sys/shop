"use client";
import { paymentMethods } from "@/src/constants/variables";
import { PaymentMethod } from "@/src/types/order";
import clsx from "clsx";
import Image from "next/image";

export default function OrderPaymentMethods({
  selectedMethod,
  onMethodChange,
}: {
  selectedMethod: PaymentMethod | "";
  onMethodChange: (method: PaymentMethod) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {paymentMethods.map((method) => {
        const isSelected = selectedMethod === method.value;

        const currentIcon = isSelected
          ? (method.selectedIcon ?? method.icon)
          : method.icon;

        return (
          <button
            key={method.value}
            type="button"
            onClick={() => onMethodChange(method.value as PaymentMethod)}
            className={clsx(
              "flex items-center justify-center h-12 border cursor-pointer",
              isSelected
                ? "border-black bg-black text-white"
                : "border-gray-300 bg-white text-black hover:bg-gray-200",
            )}
          >
            {currentIcon && method.width && method.height ? (
              <Image
                src={currentIcon}
                alt={method.label}
                width={method.width}
                height={method.height}
                className="object-contain"
              />
            ) : (
              <span className="text-sm font-medium">{method.label}</span>
            )}
          </button>
        );
      })}

      <input type="hidden" name="payment_method" value={selectedMethod} />
    </div>
  );
}
