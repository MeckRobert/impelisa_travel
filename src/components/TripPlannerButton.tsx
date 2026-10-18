"use client";
import { useTripPlanner } from "@/context/TripPlannerContext";
import { ReactNode } from "react";

interface TripPlannerButtonProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Drop-in replacement for any CTA link/button that should open the
 * "Find Your Perfect Trip" modal. Works inside server-component pages.
 */
export default function TripPlannerButton({
  children,
  className = "btn-gold",
  id,
}: TripPlannerButtonProps) {
  const { openModal } = useTripPlanner();
  return (
    <button id={id} onClick={() => openModal()} className={className}>
      {children}
    </button>
  );
}
