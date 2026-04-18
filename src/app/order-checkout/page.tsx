import Breadcrumb from "@/src/components/Breadcrumb";
import OrderSteps from "../../components/order/OrderSteps";
import OrderForm from "@/src/components/order/OrderForm";
import { getAddress } from "@/src/lib/data/address";
import { PaymentInfo } from "@/src/components/common/PaymentInfo";
import { getUserInfo } from "@/src/lib/data/user";
import { useCartStore } from "@/src/store/CartStore";

export default async function OrderCheckoutPage() {
  const addresses = await getAddress();
  const user = await getUserInfo();

  return (
    <div className="w-full mx-auto p-6">
      <Breadcrumb />
      <OrderSteps />
      <div className="flex gap-8 mt-10">
        <OrderForm addresses={addresses} user={user} />
        <PaymentInfo variant="order" />
      </div>
    </div>
  );
}
