import Link from "next/link";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { ProductsTable } from "@/components/shared/admin/productsTable";
import { getAllProducts } from "@/lib/actions/product.actions";
import { requireAdmin } from "@/lib/auth-guard";

export const metadata: Metadata = {
  title: "Admin Products",
};

const AdminProductsPage = async (props: {
  searchParams: Promise<{ page: string; query: string; category: string }>;
}) => {
  await requireAdmin();

  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const query = searchParams.query || "";
  const category = searchParams.category || "";

  const products = await getAllProducts({
    page,
    query,
    category,
  });

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <h2 className="h2-bold">Products</h2>
        <Button variant="default">
          <Link href="/admin/products/create">Create Product</Link>
        </Button>
      </div>
      <ProductsTable
        products={products.data}
        totalPages={products.totalPages}
        page={page}
      />
    </div>
  );
};

export default AdminProductsPage;
