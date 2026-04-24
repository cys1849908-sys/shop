import Breadcrumb from "@/src/components/Breadcrumb";
import OrderSteps from "../../components/order/OrderSteps";
import Link from "next/link";
import { PaymentInfo } from "@/src/components/common/PaymentInfo";
import OrderAddressInfo from "@/src/components/order/OrderAddressInfo";
import OrderLineItem from "@/src/components/order/OrderLineItem";
import { getOrderDetails } from "@/src/lib/data/order";

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id: orderId } = await searchParams;
  const orderData = await getOrderDetails(orderId);
  const addressData = {
    receiverName: orderData.receiverName,
    phoneNumber: orderData.phoneNumber,
    address: orderData.address,
    detailAddress: orderData.detailAddress,
    postcode: orderData.postcode,
    shippingMessage: orderData.shippingMessage,
  };
  const summary = {
    originalPrice: orderData.originalPrice ?? 0,
    totalPrice: orderData.totalPrice ?? 0,
    discountPrice: orderData.discountPrice ?? 0,
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 mb-20">
      <Breadcrumb />
      <OrderSteps />

      <div className="text-center py-16 border-b-2 border-black">
        <p className="mt-4 text-gray-500 font-medium">
          주문이 정상적으로 완료되었습니다.
        </p>
        <div className="inline-block mt-6 px-4 py-2 border border-gray-200 text-black font-bold text-sm">
          주문번호: {orderId}
        </div>
      </div>
      <div className="flex gap-8 mt-10">
        <div className="flex-2">
          <div className="flex flex-col ">
            {orderData.orderItems.map((item) => (
              <OrderLineItem
                key={item.id}
                readOnly
                product={{
                  ...item,
                  unitPrice: item.unitPrice,
                  discountRate: item.discountRate,
                }}
              />
            ))}
            <OrderAddressInfo addressData={addressData} />
          </div>
        </div>
        <PaymentInfo variant="order-confirmation" summary={summary} />
      </div>
    </div>
  );
}
