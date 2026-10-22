"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function CtaSection() {
  const { t } = useLanguage();
  return (
    <section className="on-media relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/serengeti.jpg"
          alt="Serengeti at sunset"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(ellipse at center, var(--gold) 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 text-center">
        <p className="section-label mb-4">{t.cta.label}</p>
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
          {t.cta.title1}
          <br />
          <span className="text-[var(--gold-light)]">{t.cta.title2}</span>
        </h2>
        <p className="text-white/60 text-base max-w-lg mx-auto mb-10 leading-relaxed">
          {t.cta.body}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/contact" className="btn-gold">
            {t.cta.planNow}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <Link href="/safari-packages" className="btn-outline">
            {t.cta.browse}
          </Link>
        </div>
      </div>
    </section>
  );
}
