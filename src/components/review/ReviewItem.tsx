"use client";

import { MdStar } from "react-icons/md";
import Image from "next/image";

type Gender = "male" | "female" | string;

interface ReviewItemProps {
  user: string;
  gender: Gender;
  rating: number;
  date: string;
  option: string;
  content: string;
  images?: string[];
  height?: number;
  weight?: number;
  size?: string;
}

export function ReviewItem({
  user,
  gender,
  rating,
  date,
  option,
  content,
  images,
  height,
  weight,
  size = "W",
}: ReviewItemProps) {
  const maskName = (name: string) => {
    return name.slice(0, 1) + "****";
  };
  return (
    <div className="py-8 border-b border-gray-100 last:border-0">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-1">
          {/* 별점 */}
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <MdStar
                key={i}
                size={18}
                className={i < rating ? "text-black" : "text-gray-200"}
              />
            ))}
          </div>

          {/* 유저 정보 */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold text-gray-900">{maskName(user)}</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              {gender === "female" ? "여성" : "남성"}
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-400">{date}</span>
          </div>

          {(height || weight || size || option) && (
            <div className="flex gap-1.5 mt-0.5 flex-wrap">
              {option && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {option}
                </span>
              )}
              {height && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  키 {height}cm
                </span>
              )}
              {weight && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {weight}kg
                </span>
              )}
              {size && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  구매 {size}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="text-base leading-relaxed text-gray-800 mb-4 whitespace-pre-line">
        {content}
      </p>

      {/* 리뷰 이미지 */}
      {images && images.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden "
            >
              <Image
                src={img}
                alt="리뷰 이미지"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
