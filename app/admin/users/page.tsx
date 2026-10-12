import { Metadata } from "next";

import { UsersTable } from "@/components/shared/admin/usersTable";
import { getAllUsers } from "@/lib/actions/user.actions";
import { requireAdmin } from "@/lib/auth-guard";

export const metadata: Metadata = {
  title: "Admin Users",
};

const AdminUsersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  await requireAdmin();

  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;

  const users = await getAllUsers({
    page,
  });

  return (
    <div className="space-y-2">
      <h2 className="h2-bold">Users</h2>
      <UsersTable
        users={users.data}
        totalPages={users.totalPages}
        page={page}
      />
    </div>
  );
};

export default AdminUsersPage;
