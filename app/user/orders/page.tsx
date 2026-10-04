import { Metadata } from "next";

import { OrderHistoryTable } from "@/components/shared/orderHistory/orderHistoryTable";
import { getMyOrders } from "@/lib/actions/order.actions";

export const metadata: Metadata = {
  title: "My Orders",
};

const OrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await props.searchParams;

  const orders = await getMyOrders({
    page: Number(page) || 1,
  });

  return (
    <div className="space-y-2">
      <h2 className="h2-bold">Orders</h2>
      <OrderHistoryTable orders={orders.data} totalPages={orders.totalPages} page={page} />
    </div>
  );
};

export default OrdersPage;
