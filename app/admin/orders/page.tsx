import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { OrdersTable } from "@/components/shared/admin/ordersTable";
import { getAllOrders } from "@/lib/actions/order.actions";
import { requireAdmin } from "@/lib/auth-guard";

export const metadat: Metadata = {
  title: "Admin Orders",
};

const AdminOrdersPage = async (props: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  await requireAdmin();

  const { page = "1", query } = await props.searchParams;

  const orders = await getAllOrders({
    page: Number(page),
    query,
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <h1 className="h2-bold">Orders</h1>
        {query && (
          <div>
            Filtered by<i>&quot;{query}&quot;</i>{" "}
            <Link href="/admin/orders">
              <Button variant="outline" size="sm">
                Remove Filter
              </Button>
            </Link>
          </div>
        )}
      </div>
      <OrdersTable
        orders={orders.data}
        totalPages={orders.totalPages}
        page={page}
      />
    </div>
  );
};

export default AdminOrdersPage;
