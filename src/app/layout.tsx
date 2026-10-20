import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Impelisa Travel & Tours Africa | African Safari & Adventure",
  description:
    "Discover Africa's most breathtaking destinations with Impelisa Travel & Tours Africa. Expert-guided safaris, pristine beaches, and tailor-made adventures across Tanzania and East Africa.",
  keywords: "Africa safari, Tanzania tour, Serengeti, Kilimanjaro, Zanzibar, wildlife, travel",
  openGraph: {
    title: "Impelisa Travel & Tours Africa",
    description: "Yaour Trusted Safari Partner in Africa",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
