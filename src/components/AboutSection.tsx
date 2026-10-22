"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();
  const stats = [
    { value: "100+", label: t.aboutHome.tours },
    { value: "10K+", label: t.aboutHome.travelers },
    { value: "50+", label: t.aboutHome.destinations },
    { value: "100%", label: t.aboutHome.satisfaction },
  ];

  return (
    <section className="bg-[var(--bg-2)] py-0 lg:py-0 overflow-hidden">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid lg:grid-cols-2 items-center">
          {/* Left Image */}
          <div className="relative h-[360px] lg:h-[480px] overflow-hidden">
            <Image
              src="/images/safari-jeep.jpg"
              alt="Safari jeep at African sunset"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Side gradient for desktop */}
            <div className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg-2)] to-transparent" />
          </div>

          {/* Right Content */}
          <div className="px-8 lg:px-14 py-12 lg:py-16">
            <p className="section-label mb-3">{t.aboutHome.label}</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--fg)] leading-tight mb-5">
              {t.aboutHome.title1}
              <br />
              {t.aboutHome.title2}
            </h2>
            <p className="text-[var(--fg-muted)] leading-relaxed mb-8 text-sm lg:text-base">
              {t.aboutHome.body}
            </p>

            <Link href="/about" className="btn-outline-gold text-sm mb-10 inline-flex">
              {t.aboutHome.learnMore}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border-t border-[var(--line)] pt-8">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`text-center px-4 ${
                    i > 0 ? "border-l border-[var(--line)]" : ""
                  }`}
                >
                  <div className="text-[var(--gold)] font-bold text-2xl lg:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-[var(--fg-muted)] text-xs mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
