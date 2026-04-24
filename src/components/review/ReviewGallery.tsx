"use client";

import { useModal } from "@/src/hooks/useModal";
import Image from "next/image";
import { MdChevronRight } from "react-icons/md";
import Modal from "../common/modals/Modal";
import { useState } from "react";
import { ReviewItem } from "@/src/types/review";

export default function ReviewGallery({
  reviewData,
}: {
  reviewData: ReviewItem[];
}) {
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const handleImageClick = (item: ReviewItem) => {
    setSelectedReview(item);
    openModal();
  };

  console.log(selectedReview);
  return (
    <div className="py-10 border-b">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-1.5">
          <span className="text-[17px] font-bold">
            사진 ({reviewData.length})
          </span>
        </div>

        <button
          className="flex items-center text-sm text-gray-500 hover:text-black transition-colors"
          onClick={openModal}
        >
          전체보기
          <MdChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-5 gap-1">
        {reviewData.slice(0, 5).map((item, index) => (
          <button
            key={`${item.image}-${index}`}
            className="relative aspect-square bg-gray-100 overflow-hidden group cursor-pointer"
            onClick={() => handleImageClick(item)}
          >
            <Image
              src={item.image}
              alt={`리뷰 이미지 ${index + 1}`}
              fill
              sizes="(max-width: 768px) 20vw, 150px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} backdropBlur>
        <div className="bg-white w-[900px] flex p-4 h-[600px]">
          <div className="grid grid-cols-3 gap-2 w-[500px] overflow-y-auto pr-2 border-r">
            {reviewData.map((item, index) => (
              <button
                key={`${item.image}-${index}`}
                className={`relative aspect-square bg-gray-100 overflow-hidden group cursor-pointer border-2 ${
                  selectedReview?.image === item.image
                    ? "border-black"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedReview(item)}
              >
                <Image
                  src={item.image}
                  alt={`리뷰 이미지 ${index + 1}`}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <div className="flex-1 pl-4 flex flex-col">
            {selectedReview ? (
              <>
                <div className="relative w-full aspect-square mb-4">
                  <Image
                    src={selectedReview.image}
                    alt="선택된 리뷰 이미지"
                    fill
                    className="object-contain bg-black"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg mb-2">
                    {selectedReview.userName}님의 리뷰
                  </p>
                  <p className="text-gray-600">별점: {selectedReview.rating}</p>
                  <p className="text-gray-600">
                    리뷰 ID: {selectedReview.userName}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                이미지를 선택해주세요.
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
