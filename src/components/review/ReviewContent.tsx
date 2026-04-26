"use client";

import { useState } from "react";
import { Review } from "@/src/types/review";
import { useModal } from "@/src/hooks/useModal";
import ReviewSummary from "./ReviewSummary";
import ReviewGallery from "./ReviewGallery";
import ReviewFilter from "./ReviewFilter";
import ReviewDetailModal from "./ReviewDetailModal";
import InfiniteScrollList from "../InfiniteScrollList";

export default function ReviewContent({
  reviews,
  slug,
}: {
  reviews: Review[];
  slug: string;
}) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>(
    selectedReview?.images[0] || "",
  );
  const { isOpen, openModal, closeModal } = useModal();

  const handleImageClick = (review: Review, img: string) => {
    setSelectedReview(review);
    setSelectedImage(img);
    openModal();
  };

  return (
    <div className="px-16 py-10">
      <ReviewSummary reviews={reviews} />
      <ReviewGallery reviews={reviews} onImageClick={handleImageClick} />
      <ReviewFilter />
      <InfiniteScrollList slug={slug} onImageClick={handleImageClick} />
      <ReviewDetailModal
        isOpen={isOpen}
        onClose={closeModal}
        selectedImage={selectedImage}
        selectedReview={selectedReview}
        onImageClick={handleImageClick}
        reviews={reviews}
      />
    </div>
  );
}
