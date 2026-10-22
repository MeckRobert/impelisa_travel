"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const destinations = [
  {
    name: "Serengeti National Park",
    country: "Tanzania",
    image: "/images/serengeti.jpg",
    href: "/destinations/serengeti",
  },
  {
    name: "Ngorongoro Crater",
    country: "Tanzania",
    image: "/images/ngorongoro.jpg",
    href: "/destinations/ngorongoro",
  },
  {
    name: "Zanzibar",
    country: "Tanzania",
    image: "/images/zanzibar.jpg",
    href: "/destinations/zanzibar",
  },
  {
    name: "Mount Kilimanjaro",
    country: "Tanzania",
    image: "/images/kilimanjaro.jpg",
    href: "/destinations/kilimanjaro",
  },
  {
    name: "Mikumi National Park",
    country: "Tanzania",
    image: "/images/mikumi.jpg",
    href: "/destinations/mikumi",
  },
];

export default function DestinationsSection() {
  const { t } = useLanguage();
  return (
    <section className="bg-[var(--bg)] py-20">
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label mb-2">{t.destHome.label}</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--fg)] leading-tight">
              {t.destHome.title}
            </h2>
          </div>
          <Link
            href="/destinations"
            className="hidden md:flex items-center gap-2 text-[var(--gold)] text-sm font-semibold hover:gap-3 transition-all duration-200"
          >
            {t.destHome.viewAll}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {destinations.map((dest) => (
            <Link key={dest.name} href={dest.href} className="dest-card card-hover h-72 group block">
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
              {/* Gradient */}
              <div className="gradient-overlay absolute inset-0" />
              {/* Info */}
              <div className="on-media absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-1 text-white/60 text-xs mb-1">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {dest.country}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-white font-semibold text-sm leading-tight">{dest.name}</h3>
                  <div className="arrow-btn shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-8 md:hidden text-center">
          <Link href="/destinations" className="btn-outline-gold text-sm">
            {t.destHome.viewAll}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
