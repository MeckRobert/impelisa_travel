"use client";

import AdminShell from "@/components/admin/AdminShell";
import { usePathname } from "next/navigation";
import { ReactNode, Suspense } from "react";

function AdminLayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return <AdminShell>{children}</AdminShell>;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </Suspense>
  );
}