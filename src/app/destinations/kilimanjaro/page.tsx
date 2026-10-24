import type { Metadata } from "next";
import DestinationDetailPage from "@/components/DestinationDetailPage";

export const metadata: Metadata = {
  title: "Mount Kilimanjaro | Impelisa Travel & Tours Africa",
  description:
    "Conquer Africa's highest peak with expert KINAPA-certified guides. Trek the Machame Route on Mount Kilimanjaro. Book with Impelisa Travel & Tours Africa.",
};

export default function KilimanjaroPage() {
  return (
    <DestinationDetailPage
      config={{
        key: "kilimanjaro",
        heroImage: "/images/kilimanjaro.jpg",
      }}
    />
  );
}
