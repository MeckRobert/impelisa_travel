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

const themeBootScript = `(function(){try{var t=localStorage.getItem("impelisa-theme");if(t!=="dark"&&t!=="light")t="light";document.documentElement.setAttribute("data-theme",t);document.documentElement.style.colorScheme=t;var l=localStorage.getItem("impelisa-lang");if(l==="zh")document.documentElement.lang="zh-CN";else if(l==="sw"||l==="fr"||l==="en")document.documentElement.lang=l;}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#F6F3EC" />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
