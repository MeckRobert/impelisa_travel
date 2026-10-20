"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTripPlanner } from "@/context/TripPlannerContext";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Safari Packages", href: "/safari-packages" },
  { label: "Experiences", href: "/experiences" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useTripPlanner();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0D0D0D]/95 backdrop-blur-md shadow-lg shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1320px] mx-auto px-6 flex items-center h-[72px] gap-6">
        {/* Logo */}
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
            <div className="text-white/60 text-[0.65rem] tracking-widest uppercase">
              Travel &amp; Tours Africa
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
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

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-4 ml-auto">
          {/* Language */}
          <button className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2a14.5 14.5 0 0 1 0 20 14.5 14.5 0 0 1 0-20"/>
              <path d="M2 12h20"/>
            </svg>
            EN
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>

          {/* Search */}
          <button className="text-white/70 hover:text-white transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          {/* CTA */}
          <button onClick={() => openModal()} className="btn-gold text-sm py-2.5 px-5">
            Plan Your Trip
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden ml-auto text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0D0D0D]/98 backdrop-blur-md border-t border-white/10 px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-3 transition-colors border-b border-white/5 text-sm font-medium ${
                pathname === link.href ? "text-[var(--gold)]" : "text-white/80 hover:text-[var(--gold)]"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4">
            <button onClick={() => { openModal(); setMenuOpen(false); }} className="btn-gold w-full justify-center text-sm">
              Plan Your Trip
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
