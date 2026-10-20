"use client";
import { TripPlannerProvider } from "@/context/TripPlannerContext";
import TripPlannerModal from "@/components/TripPlannerModal";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <TripPlannerProvider>
      {children}
      {!isAdmin && <TripPlannerModal />}
    </TripPlannerProvider>
  );
}
