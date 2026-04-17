import { formatCurrency } from "@/src/lib/utils";

export default function ProductPrice({
  price,
  hasDiscount,
  discountPercent = 0,
  finalPrice,
}: {
  price: number;
  hasDiscount: boolean;
  discountPercent?: number;
  finalPrice: number;
}) {
  return (
    <div className="my-3">
      {hasDiscount && (
        <span className="text-[16px] text-gray-400 line-through">
          {formatCurrency(price)}
        </span>
      )}
      <div>
        {hasDiscount && (
          <span className="text-[18px] text-red-500 font-semibold mr-3">
            {discountPercent}%
          </span>
        )}

        <span className="text-[18px] font-bold text-brand-black">
          {formatCurrency(finalPrice)}
        </span>
      </div>
    </div>
  );
}
