"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface TripPreFill {
  destination?: string;
  startDate?: string;
  endDate?: string;
  numTravellers?: string;
}

interface TripPlannerContextType {
  isOpen: boolean;
  preFill: TripPreFill;
  openModal: (preFill?: TripPreFill) => void;
  closeModal: () => void;
}

const TripPlannerContext = createContext<TripPlannerContextType>({
  isOpen: false,
  preFill: {},
  openModal: () => {},
  closeModal: () => {},
});

export function TripPlannerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preFill, setPreFill] = useState<TripPreFill>({});

  return (
    <TripPlannerContext.Provider
      value={{
        isOpen,
        preFill,
        openModal: (data?: TripPreFill) => {
          setPreFill(data ?? {});
          setIsOpen(true);
        },
        closeModal: () => {
          setIsOpen(false);
          setPreFill({});
        },
      }}
    >
      {children}
    </TripPlannerContext.Provider>
  );
}

export function useTripPlanner() {
  return useContext(TripPlannerContext);
}
