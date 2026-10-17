import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UsersTable } from "@/components/shared/admin/usersTable";
import { getAllUsers } from "@/lib/actions/user.actions";
import { requireAdmin } from "@/lib/auth-guard";

export const metadata: Metadata = {
  title: "Admin Users",
};

const AdminUsersPage = async (props: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  await requireAdmin();

  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const query = searchParams.query || "";

  const users = await getAllUsers({
    page,
    query,
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <h1 className="h2-bold">Products</h1>
        {query && (
          <div>
            Filtered by<i>&quot;{query}&quot;</i>{" "}
            <Link href="/admin/users">
              <Button variant="outline" size="sm">
                Remove Filter
              </Button>
            </Link>
          </div>
        )}
      </div>
      <UsersTable
        users={users.data}
        totalPages={users.totalPages}
        page={page}
      />
    </div>
  );
};

export default AdminUsersPage;
