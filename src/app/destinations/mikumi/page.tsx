import type { Metadata } from "next";
import DestinationDetailPage from "@/components/DestinationDetailPage";

export const metadata: Metadata = {
  title: "Mikumi National Park | Impelisa Travel & Tours Africa",
  description:
    "Tanzania's most accessible safari destination. Elephant herds, hippo pools, lions, and giraffes just hours from Dar es Salaam. Book with Impelisa Travel & Tours Africa.",
};

export default function MikumiPage() {
  return (
    <DestinationDetailPage
      config={{
        key: "mikumi",
        heroImage: "/images/mikumi.jpg",
      }}
    />
  );
}
