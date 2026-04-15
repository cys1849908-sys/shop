import clsx from "clsx";
import { FaMinus, FaPlus } from "react-icons/fa6";

export default function QuantityButton({
  quantity,
  onIncrease,
  onDecrease,
}: {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  const baseButton = "w-6 h-6 flex items-center justify-center cursor-pointer";

  const decreaseButtonClass = clsx(
    baseButton,
    "text-brand-black",
    quantity === 1 && "text-gray-400 cursor-not-allowed",
  );

  const increaseButtonClass = clsx(
    baseButton,
    "text-brand-black",
    quantity === 50 && "text-gray-400 cursor-not-allowed",
  );
  return (
    <div className="flex items-center bg-white border border-gray-300">
      <button
        onClick={onDecrease}
        className={decreaseButtonClass}
        disabled={quantity === 1}
      >
        <FaMinus size={10} />
      </button>

      <div
        className="w-9 h-9 text-[14px] flex items-center justify-center
      text-base font-medium text-brand-black"
      >
        {quantity}
      </div>

      <button
        onClick={onIncrease}
        className={increaseButtonClass}
        disabled={quantity === 50}
      >
        <FaPlus size={10} />
      </button>
    </div>
  );
}
