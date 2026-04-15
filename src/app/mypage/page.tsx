import Breadcrumb from "@/src/components/Breadcrumb";
import UserSummary from "@/src/components/UserSummary";
import OrderStatus from "../../components/order/OrderStatus";
import MyPageMenu from "./MyPageMenu";

export default function Mypage() {
  return (
    <div>
      <UserSummary />
      <OrderStatus />
      <MyPageMenu />
    </div>
  );
}
