import Link from "next/link";
import Image from "next/image";
import { MdChevronRight } from "react-icons/md";

export default function ReviewGallery() {
  // 연습용 더미 이미지 데이터
  const images = [
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",
  ];

  return (
    <div className="py-10 border-b">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-1.5">
          <span className="text-[17px] font-bold">포토 & 동영상</span>
        </div>

        <Link
          href="/reviews/photo"
          className="flex items-center text-sm text-gray-500 hover:text-black transition-colors"
        >
          전체보기
          <MdChevronRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-1">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative aspect-square bg-gray-100 overflow-hidden group cursor-pointer"
          >
            <Image
              src={src}
              alt={`리뷰 이미지 ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {index === 4 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-sm font-medium">+119</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
