import { XIcon } from "lucide-react";
import QuantityButton from "../common/buttons/QuantityButton";

export default function ProductOptionSelector({
  quantity,
  size,
  onIncrease,
  onDecrease,
  onRemoveSize,
}: {
  quantity: number;
  size: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemoveSize: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-2 py-1 bg-white border-b border-white">
      <div className="flex-1">
        <span className="text-[13px]   font-medium text-[#333333]">{size}</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="scale-[0.85] origin-right">
          <QuantityButton
            quantity={quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        </div>

        <button
          onClick={onRemoveSize}
          className="flex items-center justify-center p-1 cursor-pointer hover:bg-gray-200 rounded-sm transition-colors"
          aria-label="옵션 삭제"
        >
          <XIcon size={14} className="text-gray-200 hover:text-gray-500" />
        </button>
      </div>
    </div>
  );
}
