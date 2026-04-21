import clsx from "clsx";
import OptionSelect from "../common/OptionSelect";

interface DateRangeProps {
  selectedRange: string;
  onSelect: (range: string) => void;
  onClose: () => void;
}

export default function DateRange({
  selectedRange,
  onSelect,
  onClose,
}: DateRangeProps) {
  const handleRangeClick = (range: string) => {
    onSelect(selectedRange === range ? "" : range);
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-[350px] bg-white border border-gray-200 shadow-xl p-7 z-50">
      <div className="grid grid-cols-3 gap-1 mb-4">
        <button
          onClick={() => handleRangeClick("3m")}
          className={clsx(
            "py-2 text-sm text-center border cursor-pointer",
            selectedRange === "3m"
              ? "bg-black text-white border-black"
              : "border-gray-200 text-black ",
          )}
        >
          3개월
        </button>
        <button
          onClick={() => handleRangeClick("6m")}
          className={clsx(
            "py-2 text-sm text-center border cursor-pointer",
            selectedRange === "6m"
              ? "bg-black text-white border-black"
              : "border-gray-200 text-black ",
          )}
        >
          6개월
        </button>
        <button
          onClick={() => handleRangeClick("custom")}
          // disabled={selectedRange}
          className={clsx(
            "py-2 text-sm text-center border cursor-pointer",
            selectedRange === "custom"
              ? "bg-black text-white border-black"
              : "border-gray-200 text-black ",
          )}
        >
          기간선택
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <OptionSelect />
        <OptionSelect />
      </div>

      <div className="flex gap-2 pt-3 border-t border-gray-100">
        <button
          onClick={onClose}
          className="flex-1 py-2 text-sm text-center border border-gray-200  text-gray-600 cursor-pointer"
        >
          취소
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-2 text-sm text-center bg-black text-white border border-black "
          disabled={!selectedRange}
        >
          적용하기
        </button>
      </div>
    </div>
  );
}
