import { Metadata } from "next";

import { OrdersTable } from "@/components/shared/admin/ordersTable";
import { getAllOrders } from "@/lib/actions/order.actions";
import { requireAdmin } from "@/lib/auth-guard";

export const metadat: Metadata = {
  title: "Admin Orders",
};

const AdminOrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  await requireAdmin();

  const { page = "1" } = await props.searchParams;

  const orders = await getAllOrders({
    page: Number(page),
  });

  return (
    <div className="space-y-2">
      <h2 className="h2-bold">Orders</h2>
      <OrdersTable
        orders={orders.data}
        totalPages={orders.totalPages}
        page={page}
      />
    </div>
  );
};

export default AdminOrdersPage;
