import type { Metadata } from "next";
import DestinationDetailPage from "@/components/DestinationDetailPage";

export const metadata: Metadata = {
  title: "Zanzibar | Impelisa Travel & Tours Africa",
  description:
    "Explore the Spice Island — pristine beaches, vibrant Stone Town, coral reefs, and spice farm tours. Plan your Zanzibar holiday with Impelisa Travel & Tours Africa.",
};

export default function ZanzibarPage() {
  return (
    <DestinationDetailPage
      config={{
        key: "zanzibar",
        heroImage: "/images/zanzibar.jpg",
      }}
    />
  );
}
