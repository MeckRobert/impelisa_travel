"use client";
import { TripPlannerProvider } from "@/context/TripPlannerContext";
import TripPlannerModal from "@/components/TripPlannerModal";
import { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <TripPlannerProvider>
      {children}
      <TripPlannerModal />
    </TripPlannerProvider>
  );
}
