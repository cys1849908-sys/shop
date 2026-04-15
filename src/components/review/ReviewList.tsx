"use client";

import { ReviewItem } from "./ReviewItem";

const MOCK_REVIEWS = [
  {
    id: 8,
    user: "임지민",
    gender: "female",
    height: 162,
    weight: 51,
    rating: 5,
    date: "2024.02.26",
    option: "Beige / M",
    content:
      "색감이 너무 포근하고 예뻐요. 키 162 기준 골반까지 오는 적당한 기장입니다.",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
    ],
  },
  {
    id: 9,
    user: "김민재",
    gender: "male",
    height: 181,
    weight: 78,
    rating: 4,
    date: "2024.02.27",
    option: "Navy / XXL",
    content:
      "XL랑 고민하다 XXL 샀는데 세미 오버핏으로 딱 좋네요. 어깨가 좀 있는 편인데 편합니다.",
    images: [],
  },
  {
    id: 10,
    user: "서유나",
    gender: "female",
    height: 158,
    weight: 47,
    rating: 5,
    date: "2024.02.28",
    option: "White / S",
    content:
      "여리여리해 보이고 좋아요! 소매가 약간 길긴 한데 접어 입으니까 스타일리시하네요.",
    images: ["https://images.unsplash.com/photo-1554568218-0f1715e72254?w=400"],
  },
  {
    id: 11,
    user: "윤성호",
    gender: "male",
    height: 175,
    weight: 70,
    rating: 3,
    date: "2024.03.01",
    option: "Black / L",
    content:
      "평소 100 입는데 정사이즈 느낌이에요. 오버핏 원하시면 한 치수 크게 주문하세요.",
    images: [],
  },
  {
    id: 12,
    user: "송혜린",
    gender: "female",
    height: 168,
    weight: 55,
    rating: 4,
    date: "2024.03.02",
    option: "Grey / L",
    content:
      "재질이 톡톡해서 비침 걱정 없어요. 세탁기 돌려도 목 늘어남이 거의 없어서 좋네요.",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
    ],
  },
];
export default function ReviewList() {
  return (
    <div className="mt-4">
      <div className="flex flex-col">
        {MOCK_REVIEWS.map((review) => (
          <ReviewItem key={review.id} {...review} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button className="px-10 py-3 border border-gray-200 text-base font-medium hover:bg-gray-50 transition-colors rounded-sm">
          리뷰 더보기 (1/12)
        </button>
      </div>
    </div>
  );
}
