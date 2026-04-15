"use client";

import { Star } from "lucide-react"; // lucide-react 아이콘 추천

interface ReviewSummaryProps {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    label: string; // 5점, 4점...
    count: number;
    percentage: number;
  }[];
}

export default function ReviewSummary({
  averageRating = 4.3,
  totalReviews = 124,
  ratingDistribution = [
    { label: "5점", count: 100, percentage: 80 },
    { label: "4점", count: 15, percentage: 12 },
    { label: "3점", count: 5, percentage: 4 },
    { label: "2점", count: 3, percentage: 3 },
    { label: "1점", count: 1, percentage: 1 },
  ],
}: ReviewSummaryProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-gray-50 rounded-lg border">
      <div className="flex flex-col items-center justify-center text-center px-4">
        <div className="flex items-center justify-center">
          <Star size={40} className={"fill-black text-black"} />
          <span className="text-5xl font-bold text-black">
            {averageRating.toFixed(1)}
          </span>
        </div>
        <p className="text-sm text-gray-500">{totalReviews}개의 리뷰</p>
      </div>

      <div className="flex-1 w-full space-y-2">
        {ratingDistribution.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-sm font-medium w-8 whitespace-nowrap">
              {item.label}
            </span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-1000"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="text-sm text-gray-400 w-8">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
