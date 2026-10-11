import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pagination } from "../pagination";
import { DeleteDialog } from "../deleteDialog";
import { deleteProduct } from "@/lib/actions/product.actions";
import { formatCurrency, formatId } from "@/lib/utils";
import { Product } from "@/types";

type Props = {
  products: Product[];
  totalPages: number;
  page: number;
};

export const ProductsTable = ({ products, totalPages, page }: Props) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-500">ID</TableHead>
            <TableHead className="text-gray-500">NAME</TableHead>
            <TableHead className="text-gray-500">PRICE</TableHead>
            <TableHead className="text-gray-500">CATEGORY</TableHead>
            <TableHead className="text-gray-500">STOCK</TableHead>
            <TableHead className="text-gray-500">RATING</TableHead>
            <TableHead className="text-gray-500">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{formatId(product.id)}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.rating}</TableCell>
              <TableCell className="flex gap-1">
                <Button variant="outline" size="sm">
                  <Link href={`/admin/products/${product.id}`}>Edit</Link>
                </Button>
                <DeleteDialog id={product.id} action={deleteProduct} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </div>
  );
};
