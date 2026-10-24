"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTripPlanner } from "@/context/TripPlannerContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { LOCALES } from "@/i18n";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useTripPlanner();
  const { locale, t, setLocale } = useLanguage();
  const { theme, setTheme } = useTheme();
  const langRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);
  const overHero = pathname === "/" && !scrolled;

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.destinations, href: "/destinations" },
    { label: t.nav.packages, href: "/safari-packages" },
    { label: t.nav.experiences, href: "/experiences" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const currentLang = LOCALES.find((item) => item.id === locale) ?? LOCALES[1];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!langRef.current?.contains(event.target as Node)) setLangOpen(false);
      if (!mobileLangRef.current?.contains(event.target as Node)) setMobileLangOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const actionClass = overHero
    ? "text-white/80 hover:text-white"
    : "text-[var(--fg)]/70 hover:text-[var(--fg)]";

  const mobileActionClass = overHero
    ? "text-white/90 hover:text-white active:scale-90"
    : "text-[var(--fg)]/80 hover:text-[var(--fg)] active:scale-90";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        overHero ? "on-media bg-transparent" : ""
      } ${
        scrolled
          ? "bg-[var(--nav-bg)] backdrop-blur-md shadow-lg shadow-black/10"
          : overHero
            ? "bg-transparent"
            : "bg-[var(--nav-bg)]/80 backdrop-blur-md"
      }`}
    >
      <nav className="max-w-[1320px] mx-auto px-6 flex items-center h-[72px] gap-6">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-12 h-12 relative">
            <Image
              src="/images/logo.png"
              alt="Impelisa Travel & Tours Africa"
              fill
              className="object-contain rounded-xl"
            />
          </div>
          <div className="leading-tight">
            <div className="text-[var(--gold)] font-bold text-lg tracking-wide uppercase">
              IMPELISA
            </div>
            <div className={`text-[0.65rem] tracking-widest uppercase ${overHero ? "text-white/60" : "text-[var(--fg)]/50"}`}>
              Travel &amp; Tours Ltd
            </div>
          </div>
        </Link>

        {/* ── Desktop nav links ── */}
        <div className="hidden lg:flex items-center gap-6 ml-6 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link font-medium text-sm ${
                pathname === link.href ? "active" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Desktop right controls ── */}
        <div className="hidden lg:flex items-center gap-3 ml-auto">
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen((open) => !open)}
              className={`flex items-center gap-1.5 text-sm transition-colors ${actionClass}`}
              aria-label={t.nav.language}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a14.5 14.5 0 0 1 0 20 14.5 14.5 0 0 1 0-20"/>
                <path d="M2 12h20"/>
              </svg>
              {currentLang.short}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-[var(--line)] bg-[var(--bg-2)] py-1 shadow-xl z-50">
                {LOCALES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setLocale(item.id);
                      setLangOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-2 text-sm ${
                      locale === item.id
                        ? "text-[var(--gold)] bg-[var(--gold)]/10"
                        : "text-[var(--fg)] hover:bg-[var(--bg-3)]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs opacity-60">{item.short}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`p-1.5 rounded-lg transition-colors ${actionClass}`}
            aria-label={theme === "light" ? t.nav.themeDark : t.nav.themeLight}
            title={theme === "light" ? t.nav.themeDark : t.nav.themeLight}
          >
            {theme === "light" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
            )}
          </button>

          <button onClick={() => openModal()} className="btn-gold text-sm py-2.5 px-5">
            {t.nav.planTrip}
          </button>
        </div>

        {/* ── Mobile: language + theme + hamburger ── */}
        <div className="lg:hidden ml-auto flex items-center gap-1">

          {/* Language pill */}
          <div className="relative" ref={mobileLangRef}>
            <button
              type="button"
              onClick={() => setMobileLangOpen((o) => !o)}
              aria-label={t.nav.language}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold tracking-wider transition-all duration-200 border ${
                overHero
                  ? `border-white/25 text-white/90 hover:border-white/50 hover:bg-white/10 ${mobileLangOpen ? "bg-white/10 border-white/50" : ""}`
                  : `border-[var(--line)] text-[var(--fg)]/80 hover:border-[var(--gold)]/60 hover:text-[var(--gold)] ${mobileLangOpen ? "border-[var(--gold)]/60 text-[var(--gold)] bg-[var(--gold)]/5" : ""}`
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a14.5 14.5 0 0 1 0 20 14.5 14.5 0 0 1 0-20"/>
                <path d="M2 12h20"/>
              </svg>
              {currentLang.short}
            </button>

            {mobileLangOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-[var(--line)] bg-[var(--bg-2)] py-1.5 shadow-2xl z-50">
                <p className="px-3 pb-1 pt-0.5 text-[10px] uppercase tracking-widest text-[var(--fg)]/40 font-medium">
                  {t.nav.language}
                </p>
                {LOCALES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setLocale(item.id);
                      setMobileLangOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-2.5 text-sm transition-colors ${
                      locale === item.id
                        ? "text-[var(--gold)] bg-[var(--gold)]/10 font-medium"
                        : "text-[var(--fg)] hover:bg-[var(--bg-3)]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {locale === item.id ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[var(--gold)] shrink-0">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    ) : (
                      <span className="text-xs opacity-40">{item.short}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={theme === "light" ? t.nav.themeDark : t.nav.themeLight}
            className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 ${mobileActionClass} ${
              overHero ? "hover:bg-white/10" : "hover:bg-[var(--bg-3)]"
            }`}
          >
            {theme === "light" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
            )}
          </button>

          {/* Hamburger */}
          <button
            className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 ${mobileActionClass} ${
              overHero ? "hover:bg-white/10" : "hover:bg-[var(--bg-3)]"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown menu ── */}
      {menuOpen && (
        <div className="lg:hidden bg-[var(--nav-bg)] backdrop-blur-md border-t border-[var(--line)] px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-3 transition-colors border-b border-[var(--line)] text-sm font-medium ${
                pathname === link.href ? "text-[var(--gold)]" : "text-[var(--fg)]/80 hover:text-[var(--gold)]"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4">
            <button
              onClick={() => { openModal(); setMenuOpen(false); }}
              className="btn-gold w-full justify-center text-sm"
            >
              {t.nav.planTrip}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
