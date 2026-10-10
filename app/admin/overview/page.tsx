import { Metadata } from "next";

import { Overview } from "@/components/shared/admin/overview";
import { Dashboard } from "@/components/shared/admin/dashboard";
import { requireAdmin } from "@/lib/auth-guard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const AdminOverviewPage = async () => {
  await requireAdmin();

  return (
    <div className="space-y-2">
      <h1 className="h2-bold">Dashboard</h1>
      <Dashboard />
      <Overview />
    </div>
  );
};

export default AdminOverviewPage;
