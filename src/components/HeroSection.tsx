"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTripPlanner } from "@/context/TripPlannerContext";

const destinations = [
  "Serengeti National Park",
  "Ngorongoro Crater",
  "Zanzibar",
  "Mount Kilimanjaro",
  "Mikumi National Park",
  "Lake Manyara",
  "Ruaha National Park",
];

const travellers = ["1 Traveller", "2 Travellers", "3–4 Travellers", "5+ Travellers"];

export default function HeroSection() {
  const { openModal } = useTripPlanner();

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numTravellers, setNumTravellers] = useState("2 Travellers");

  /** Open the Trip Planner Modal pre-filled with hero card values */
  const handleFindTrip = (e: React.FormEvent) => {
    e.preventDefault();
    openModal({ destination, startDate, endDate, numTravellers });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
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
              EXPLORE
            </span>
            <span className="text-white/30">•</span>
            <span className="text-[var(--gold)] text-xs font-semibold tracking-[0.2em] uppercase">
              DISCOVER
            </span>
            <span className="text-white/30">•</span>
            <span className="text-[var(--gold)] text-xs font-semibold tracking-[0.2em] uppercase">
              EXPERIENCE
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] mb-6">
            <span className="text-white block">The African</span>
            <span className="text-[var(--gold-light)]">Adventure Awaits</span>
          </h1>

          <p className="text-white/70 text-base lg:text-lg leading-relaxed mb-8 max-w-md">
            From breathtaking wildlife safaris to pristine beaches and majestic
            mountains, discover Africa&apos;s most incredible destinations with
            Impelisa Travel &amp; Tours Africa.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/destinations" className="btn-gold text-sm">
              Explore Destinations
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
              Watch Our Story
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-12 hidden lg:flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center animate-bounce">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </div>
            <span className="text-white/40 text-xs tracking-widest uppercase">Scroll to explore</span>
          </div>
        </div>

        {/* Right: Search Card */}
        <form
          onSubmit={handleFindTrip}
          className="w-full max-w-sm lg:max-w-[340px] xl:max-w-[370px] lg:ml-auto search-card p-6"
        >
          {/* Card Header */}
          <div className="flex items-start gap-4 mb-6 pb-5 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/15 flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
                <circle cx="17" cy="17" r="3"/>
                <path d="m19.5 19.5-1.5-1.5"/>
              </svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-base">Find Your Perfect Trip</h3>
              <p className="text-white/50 text-xs mt-0.5 leading-relaxed">
                Search destinations, dates and get a customized experience.
              </p>
            </div>
          </div>

          {/* Destination */}
          <div className="mb-4">
            <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-2">
              Destination
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gold)]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="input-dark pl-10 pr-8 text-sm cursor-pointer"
              >
                <option value="">Select destination</option>
                {destinations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Travel Dates */}
          <div className="mb-4">
            <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-2">
              Travel Dates
            </label>
            <div className="flex items-center gap-2 bg-[var(--dark-3)] rounded-lg border border-white/10 px-3 py-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Start date"
                className="bg-transparent outline-none text-sm text-white/70 flex-1 min-w-0 [color-scheme:dark]"
              />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" opacity="0.3">
                <path d="M5 12h14"/>
              </svg>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="End date"
                className="bg-transparent outline-none text-sm text-white/70 flex-1 min-w-0 [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Number of Travellers */}
          <div className="mb-6">
            <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-2">
              Number of Travellers
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gold)]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <select
                value={numTravellers}
                onChange={(e) => setNumTravellers(e.target.value)}
                className="input-dark pl-10 pr-8 text-sm cursor-pointer"
              >
                {travellers.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Find Trip Button → opens modal */}
          <button
            type="submit"
            className="btn-gold w-full justify-center text-sm py-3.5 rounded-xl font-bold tracking-wide"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            Find My Perfect Trip
          </button>

          <p className="text-white/30 text-[10px] text-center mt-3 leading-relaxed">
            You&apos;ll complete your booking details in the next step
          </p>
        </form>
      </div>
    </section>
  );
}
