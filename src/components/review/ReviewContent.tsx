import ReviewFilter from "./ReviewFilter";
import ReviewGallery from "./ReviewGallery";
import ReviewList from "./ReviewList";
import ReviewSummary from "./ReviewSummary";

export default function ReviewContent({ productId }: { productId: string }) {
  return (
    <div className="px-16 py-10">
      <ReviewSummary />
      <ReviewGallery />
      <ReviewFilter />
      <ReviewList />
    </div>
  );
}
