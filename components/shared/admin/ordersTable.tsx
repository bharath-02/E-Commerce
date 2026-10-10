import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "../pagination";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { OrderHistory } from "@/types";
import { Button } from "@/components/ui/button";

type Props = {
  orders: OrderHistory[];
  totalPages: number;
  page: string;
};

export const OrdersTable = ({ orders, totalPages, page }: Props) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-500">ID</TableHead>
            <TableHead className="text-gray-500">DATE</TableHead>
            <TableHead className="text-gray-500">TOTAL</TableHead>
            <TableHead className="text-gray-500">PAID</TableHead>
            <TableHead className="text-gray-500">DELIVERED</TableHead>
            <TableHead className="text-gray-500">ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{formatId(order.id)}</TableCell>
              <TableCell>{formatDateTime(order.createdAt).dateTime}</TableCell>
              <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
              <TableCell>
                {order.isPaid && order.paidAt
                  ? formatDateTime(order.paidAt).dateTime
                  : "Not Paid"}
              </TableCell>
              <TableCell>
                {order.isDelivered && order.deliveredAt
                  ? formatDateTime(order.deliveredAt).dateTime
                  : "Not Delivered"}
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  <Link href={`/order/${order.id}`}>Details</Link>
                </Button>
                {/* DELETE BUTTON */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <Pagination page={Number(page) || 1} totalPages={totalPages} />
      )}
    </div>
  );
};
