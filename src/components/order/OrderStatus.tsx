import { FiChevronRight } from "react-icons/fi";

export default function OrderStatus() {
  const statusItems = [
    { label: "결제완료", count: 0 },
    { label: "배송준비중", count: 0 },
    { label: "배송중", count: 0 },
    { label: "배송완료", count: 0 },
  ];

  return (
    <div className="w-full py-12">
      <div className="flex justify-between items-center mb-10 border-black border-b-2 pb-4">
        <div className="flex items-baseline gap-2 ">
          <h2 className="text-xl font-bold  ">주문/배송 조회</h2>
          <span className="text-gray-400 text-sm">(3개월 기준)</span>
        </div>
        <button className="flex items-center text-sm text-gray-600 hover:underline">
          더보기 <FiChevronRight />
        </button>
      </div>

      <div className="flex justify-around items-center py-4 relative">
        {statusItems.map((item, index) => (
          <div key={index} className="flex items-center w-full">
            {/* 숫자와 라벨 */}
            <div className="flex flex-col items-center flex-1">
              <span className="text-3xl font-bold mb-2">{item.count}</span>
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>

            {/* 마지막 아이템이 아닐 때만 화살표 표시 */}
            {index !== statusItems.length - 1 && (
              <FiChevronRight className="text-gray-300 text-xl" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-20 flex flex-col items-center justify-center text-gray-400 py-10">
        <div className="mb-4">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="opacity-40"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="8" cy="10" r="0.5" fill="currentColor" />
            <circle cx="12" cy="10" r="0.5" fill="currentColor" />
            <circle cx="16" cy="10" r="0.5" fill="currentColor" />
          </svg>
        </div>
        <p className="text-sm">최근 3개월 내 주문 내역이 없습니다</p>
      </div>
    </div>
  );
}
