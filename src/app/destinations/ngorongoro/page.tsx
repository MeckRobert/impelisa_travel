import type { Metadata } from "next";
import DestinationDetailPage from "@/components/DestinationDetailPage";

export const metadata: Metadata = {
  title: "Ngorongoro Crater | Impelisa Travel & Tours Africa",
  description:
    "Descend into the world's largest intact volcanic caldera. See the Big Five including black rhino in Ngorongoro. Book with Impelisa Travel & Tours Africa.",
};

export default function NgorongoroPage() {
  return (
    <DestinationDetailPage
      config={{
        key: "ngorongoro",
        heroImage: "/images/ngorongoro.jpg",
      }}
    />
  );
}
