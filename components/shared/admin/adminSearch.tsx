"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";

const AdminSearch = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const formActionUrl = pathname.includes("/admin/orders")
    ? "/admin/orders"
    : pathname.includes("/admin/users")
      ? "/admin/users"
      : "/admin/products";

  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(searchParams.get("query") || "");
  }, [searchParams]);

  return (
    <form action={formActionUrl} method="GET">
      <Input
        type="search"
        placeholder="Search..."
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="md:w-25 lg:w-75"
      />
      <button type="submit" className="sr-only">
        Search
      </button>
    </form>
  );
};

export default AdminSearch;
