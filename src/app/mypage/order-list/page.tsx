import OrderListClient from "@/src/components/order/OrderListClient";
import { getOrderList } from "@/src/lib/data/order";

export default async function OrderListPage() {
  const orderList = await getOrderList();

  return (
    <main className="mx-auto py-10">
      <OrderListClient initialOrders={orderList} />
    </main>
  );
}
