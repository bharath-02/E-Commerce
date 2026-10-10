import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Charts } from "./charts";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { getOrderSummary } from "@/lib/actions/order.actions";

export const Overview = async () => {
  const summary = await getOrderSummary();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Charts salesData={summary.salesData} />
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-400">BUYER</TableHead>
                <TableHead className="text-gray-400">DATE</TableHead>
                <TableHead className="text-gray-400">TOTAL</TableHead>
                <TableHead className="text-gray-400">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary.latestSales.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    {order?.user?.name ? order.user.name : "Deleted User"}
                  </TableCell>
                  <TableCell>
                    {formatDateTime(order.createdAt).dateOnly}
                  </TableCell>
                  <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                  <TableCell>
                    <Link href={`/order/${order.id}`}>
                      <span className="px-2">Details</span>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
