import type { Metadata } from "next";
import DestinationDetailPage from "@/components/DestinationDetailPage";

export const metadata: Metadata = {
  title: "Serengeti National Park | Impelisa Travel & Tours Africa",
  description:
    "Witness the Great Migration and the Big Five in Tanzania's most iconic wildlife destination. Plan your Serengeti safari with Impelisa Travel & Tours Africa.",
};

export default function SerengetiPage() {
  return (
    <DestinationDetailPage
      config={{
        key: "serengeti",
        heroImage: "/images/serengeti.jpg",
      }}
    />
  );
}
