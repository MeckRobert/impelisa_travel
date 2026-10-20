"use client";

import { TripPlannerProvider } from "@/context/TripPlannerContext";
import TripPlannerModal from "@/components/TripPlannerModal";
import { ReactNode, Suspense } from "react";
import { usePathname } from "next/navigation";

function ClientLayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {children}
      {!isAdmin && <TripPlannerModal />}
    </>
  );
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <TripPlannerProvider>
      <Suspense fallback={<>{children}</>}>
        <ClientLayoutContent>{children}</ClientLayoutContent>
      </Suspense>
    </TripPlannerProvider>
  );
}