import ReviewClient from "@/src/components/review/ReviewClient";
import { getOrderList } from "@/src/lib/data/order";
import { getMyReviews } from "@/src/lib/data/review";

export default async function MyPageReviews() {
  const orderList = await getOrderList();
  const myReviews = await getMyReviews();

  // return <ReviewClient reviews={reviews} />;
  return null;
}
