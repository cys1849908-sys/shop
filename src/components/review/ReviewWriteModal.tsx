"use client";

import { useState, useEffect } from "react";
import ReviewStar from "./ReviewStar";
import ReviewImageUploader from "./ReviewImageUploader";
import { createReview, updateReview } from "@/src/lib/actions/review"; // updateReview 액션 필요
import { Review } from "@/src/types/review";

interface ReviewWriteModalProps {
  productId: string;
  orderId: string;
  title?: string;
  productName: string;
  initialData?: Review;
  onClose: () => void;
}

export default function ReviewWriteModal({
  productId,
  onClose,
  title,
  orderId,
  productName,
  initialData,
}: ReviewWriteModalProps) {
  const [content, setContent] = useState(initialData?.content || "");
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleSubmit = async () => {
    try {
      if (initialData) {
        await updateReview(initialData.id, {
          rating,
          content,
          existingImages: images.filter((img) => img.startsWith("blob:")),
          newImages: imageFiles,
        });
      } else {
        await createReview({
          productId,
          orderId,
          rating,
          content,
          imageFiles,
        });
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  console.log(initialData);

  return (
    <div className="w-[500px] bg-white border-2 border-black px-8 pb-8 shadow-2xl relative">
      {title && (
        <div className="flex items-center py-4 border-b border-gray-100 mb-6">
          <span className="text-[14px] font-black tracking-widest uppercase mx-auto text-black">
            {title}
          </span>
        </div>
      )}

      <div className="space-y-8 text-left">
        <div className="border border-gray-200 p-4 bg-gray-50">
          <p className="font-bold text-lg text-black tracking-tight">
            {productName}
          </p>
        </div>

        <div>
          <label className="block text-xs font-black tracking-widest text-black mb-3 uppercase">
            평점
          </label>
          <div className="flex gap-1">
            <ReviewStar rating={rating} setRating={setRating} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black tracking-widest text-black mb-3 uppercase">
            리뷰 내용
          </label>
          <textarea
            placeholder="상품에 대한 솔직한 리뷰를 남겨주세요."
            className="h-32 w-full border border-gray-200 p-4 text-sm outline-none focus:border-black transition-colors resize-none placeholder:text-gray-300"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <ReviewImageUploader
          images={images}
          setImages={setImages}
          setImageFiles={setImageFiles}
        />
      </div>

      <div className="mt-12 flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 border border-gray-200 py-4 text-xs font-black tracking-widest text-black hover:bg-gray-50 transition-colors cursor-pointer"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 bg-black py-4 text-xs font-black tracking-widest text-white hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          {initialData ? "수정 하기" : "등록 하기"}
        </button>
      </div>
    </div>
  );
}
