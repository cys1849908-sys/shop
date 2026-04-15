import Breadcrumb from "@/src/components/Breadcrumb";
import OrderSteps from "../../components/order/OrderSteps";
import OrderForm from "@/src/components/order/OrderForm";
import { getAddress } from "@/src/lib/data/address";
import { FinalPaymentInfo } from "@/src/components/common/PaymentInfo";

export default async function OrderCheckoutPage() {
  const addresses = await getAddress();

  return (
    <div className="w-full mx-auto p-6">
      <Breadcrumb />
      <OrderSteps />
      <div className="flex gap-8 mt-10">
        <OrderForm addresses={addresses} />

        <FinalPaymentInfo />
      </div>
    </div>
  );
}
