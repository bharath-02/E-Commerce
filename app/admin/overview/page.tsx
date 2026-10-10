import { Metadata } from "next";

import { auth } from "@/auth";
import { Overview } from "@/components/shared/admin/overview";
import { Dashboard } from "@/components/shared/admin/dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const AdminOverviewPage = async () => {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    throw new Error("user is not authorized");
  }

  return (
    <div className="space-y-2">
      <h1 className="h2-bold">Dashboard</h1>
      <Dashboard />
      <Overview />
    </div>
  );
};

export default AdminOverviewPage;
