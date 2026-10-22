"use client";

import { TripPlannerProvider } from "@/context/TripPlannerContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import TripPlannerModal from "@/components/TripPlannerModal";
import { ReactNode, Suspense } from "react";
import { usePathname } from "next/navigation";

function ClientLayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <div className={isAdmin ? undefined : "public-site"}>
      {children}
      {!isAdmin && <TripPlannerModal />}
    </div>
  );
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <TripPlannerProvider>
          <Suspense fallback={<>{children}</>}>
            <ClientLayoutContent>{children}</ClientLayoutContent>
          </Suspense>
        </TripPlannerProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
