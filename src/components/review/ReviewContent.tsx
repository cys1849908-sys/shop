import { Review } from "@/src/types/review";
import ReviewFilter from "./ReviewFilter";
import ReviewGallery from "./ReviewGallery";
import ReviewSummary from "./ReviewSummary";

export default function ReviewContent({ reviews }: { reviews: Review[] }) {
  const reviewData = reviews
    .filter((r) => r.images && r.images.length > 0)
    .flatMap((r) =>
      r.images.map((imgUrl) => ({
        image: imgUrl,
        userId: r.userId,
        rating: r.rating,
        content: r.content,
        userName: r.userName,
        createAt: r.createdAt,
        reviewId: r.id,
      })),
    );

  return (
    <div className="px-16 py-10">
      <ReviewSummary />
      <ReviewGallery reviewData={reviewData} />
      <ReviewFilter />
      {/* <ReviewList reviews={reviews} /> */}
    </div>
  );
}
