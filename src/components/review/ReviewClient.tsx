import { Review } from "@/src/types/review";
import OrderLineItem from "../order/OrderLineItem";

export default function ReviewClient({ reviews }: { reviews: Review[] }) {
  console.log(reviews);
  return <div>{/* <OrderLineItem /> */}</div>;
}
