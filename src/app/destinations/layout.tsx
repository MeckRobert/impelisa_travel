import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Destinations | Impelisa Travel & Tours Africa",
  description:
    "Discover Africa's most breathtaking destinations – Serengeti, Zanzibar, Mount Kilimanjaro, Ngorongoro Crater, and more. Explore with Impelisa Travel & Tours Africa.",
};

export default function DestinationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
