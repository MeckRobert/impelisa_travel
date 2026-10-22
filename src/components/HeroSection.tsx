"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="on-media relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-safari.png"
          alt="African safari landscape with lion at sunset"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 pt-24 pb-16 flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-0">
        {/* Left: Hero Text */}
        <div className="flex-1 max-w-xl">
          {/* Tag line */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[var(--gold)] text-xs font-semibold tracking-[0.2em] uppercase">
              {t.hero.explore}
            </span>
            <span className="text-white/30">•</span>
            <span className="text-[var(--gold)] text-xs font-semibold tracking-[0.2em] uppercase">
              {t.hero.discover}
            </span>
            <span className="text-white/30">•</span>
            <span className="text-[var(--gold)] text-xs font-semibold tracking-[0.2em] uppercase">
              {t.hero.experience}
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] mb-6">
            <span className="text-white block">{t.hero.title1}</span>
            <span className="text-[var(--gold-light)]">{t.hero.title2}</span>
          </h1>

          <p className="text-white/70 text-base lg:text-lg leading-relaxed mb-8 max-w-md">
            {t.hero.body}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/destinations" className="btn-gold text-sm">
              {t.hero.exploreDestinations}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <button className="btn-outline text-sm">
              <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </span>
              {t.hero.watchStory}
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-12 hidden lg:flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center animate-bounce">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </div>
            <span className="text-white/40 text-xs tracking-widest uppercase">{t.hero.scroll}</span>
          </div>
        </div>

       
      </div>
    </section>
  );
}
