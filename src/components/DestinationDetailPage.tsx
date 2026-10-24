"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TripPlannerButton from "@/components/TripPlannerButton";
import { useLanguage } from "@/context/LanguageContext";

export interface DestinationConfig {
  /** key inside t.destDetail (e.g. "serengeti") */
  key: "serengeti" | "ngorongoro" | "zanzibar" | "kilimanjaro" | "mikumi";
  heroImage: string;
  galleryImages?: string[];
  mapEmbed?: string;
}

const difficultyColor: Record<string, string> = {
  easy: "text-emerald-400",
  moderate: "text-amber-400",
  challenging: "text-red-400",
};

function diffKey(diff: string): string {
  const d = diff.toLowerCase();
  if (d.includes("easy") || d.includes("rahisi") || d.includes("facile") || d.includes("轻松")) return "easy";
  if (d.includes("challeng") || d.includes("ngumu") || d.includes("difficile") || d.includes("挑战")) return "challenging";
  return "moderate";
}

export default function DestinationDetailPage({ config }: { config: DestinationConfig }) {
  const { t } = useLanguage();
  const ui = t.destDetail;
  const dest = t.destDetail[config.key] as typeof t.destDetail.serengeti;

  const highlights = [
    { title: dest.h1, desc: dest.h1d, icon: "" },
    { title: dest.h2, desc: dest.h2d, icon: "" },
    { title: dest.h3, desc: dest.h3d, icon: "" },
    { title: dest.h4, desc: dest.h4d, icon: "" },
    { title: dest.h5, desc: dest.h5d, icon: "" },
    { title: dest.h6, desc: dest.h6d, icon: "" },
  ];

  const activities = [dest.a1, dest.a2, dest.a3, dest.a4, dest.a5, dest.a6];
  const dk = diffKey(dest.difficulty);

  return (
    <main>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[92vh] min-h-[560px] overflow-hidden">
        <img
          src={config.heroImage}
          alt={dest.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Deep gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/85" />

        {/* Breadcrumb */}
        <div className="absolute top-24 left-0 right-0 max-w-[1320px] mx-auto px-6">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[var(--gold)] text-sm transition-colors duration-200 group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {ui.backToAll}
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 max-w-[1320px] mx-auto px-6 pb-16">
          <span className="inline-block bg-[var(--gold)] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            {dest.tag}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3 drop-shadow-lg">
            {dest.name}
          </h1>
          <p className="text-white/75 text-lg lg:text-xl max-w-2xl leading-relaxed mb-6">
            {dest.tagline}
          </p>
          <TripPlannerButton className="btn-gold text-sm">
            {ui.planTrip}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </TripPlannerButton>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <section className="bg-[var(--bg-2)] border-b border-white/8 sticky top-[72px] z-30">
        <div className="max-w-[1320px] mx-auto px-6 py-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 items-center">
            {/* Duration */}
            <div className="flex items-center gap-2 text-sm">
              <svg className="text-[var(--gold)] shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="text-white/50">{ui.duration}:</span>
              <span className="text-white font-medium">{dest.duration}</span>
            </div>
            {/* Best Time */}
            <div className="flex items-center gap-2 text-sm">
              <svg className="text-[var(--gold)] shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <span className="text-white/50">{ui.bestTime}:</span>
              <span className="text-white font-medium">{dest.bestTime}</span>
            </div>
            {/* Difficulty */}
            <div className="flex items-center gap-2 text-sm">
              <svg className="text-[var(--gold)] shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              <span className="text-white/50">{ui.difficulty}:</span>
              <span className={`font-semibold ${difficultyColor[dk]}`}>{dest.difficulty}</span>
            </div>
            
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ─────────────────────────────────────────── */}
      <section className="bg-[var(--bg)] py-16">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="section-label mb-2">{ui.overview}</p>
              <h2 className="text-3xl font-bold text-white mb-6">{dest.name}</h2>
              <p className="text-white/65 leading-relaxed mb-4">{dest.desc}</p>
              <p className="text-white/55 leading-relaxed text-sm">{dest.overview}</p>
            </div>
            {/* Quick Info Card */}
            <div className="bg-[var(--bg-3)] rounded-2xl p-7 border border-white/8 space-y-4">
              <InfoRow icon="" label={ui.duration} value={dest.duration} />
              <InfoRow icon="" label={ui.bestTime} value={dest.bestTime} />
              <InfoRow icon="" label={ui.difficulty} value={dest.difficulty} highlight />
              <TripPlannerButton className="w-full flex items-center justify-center gap-2 text-sm font-semibold bg-[var(--gold)] hover:brightness-110 text-black py-3 rounded-xl transition-all duration-200 mt-2">
                {ui.bookNow}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </TripPlannerButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ───────────────────────────────────────── */}
      <section className="bg-[var(--bg-2)] py-16 border-t border-white/8">
        <div className="max-w-[1320px] mx-auto px-6">
          <p className="section-label mb-2">{dest.name}</p>
          <h2 className="text-3xl font-bold text-white mb-10">{ui.highlights}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="bg-[var(--bg-3)] rounded-xl p-6 border border-white/8 hover:border-[var(--gold)]/40 transition-colors duration-300 group"
              >
                <div className="text-3xl mb-4">{h.icon}</div>
                <h3 className="text-white font-semibold text-base mb-2 group-hover:text-[var(--gold)] transition-colors duration-200">
                  {h.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIVITIES ───────────────────────────────────────── */}
      <section className="bg-[var(--bg)] py-14 border-t border-white/8">
        <div className="max-w-[1320px] mx-auto px-6">
          <p className="section-label mb-2">{dest.name}</p>
          <h2 className="text-2xl font-bold text-white mb-8">{ui.activities}</h2>
          <div className="flex flex-wrap gap-3">
            {activities.map((act, i) => (
              <span
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-white/70 text-sm hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-200 cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                {act}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-[var(--bg-2)] py-20 border-t border-white/8">
        <div className="max-w-[1320px] mx-auto px-6 text-center">
          {/* Decorative star */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--gold)" opacity="0.8">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{ui.readyTitle}</h2>
          <p className="text-white/55 max-w-md mx-auto mb-8 leading-relaxed">{ui.readyBody}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <TripPlannerButton className="btn-gold">
              {ui.bookNow}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </TripPlannerButton>
            <Link href="/destinations" className="btn-outline-gold">
              {ui.backToAll}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function InfoRow({
  icon,
  label,
  value,
  highlight,
}: {
  icon: string;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/6 last:border-0">
      <div className="flex items-center gap-2 text-white/50 text-sm">
        <span>{icon}</span>
        {label}
      </div>
      <span className={`text-sm font-medium ${highlight ? "text-[var(--gold)]" : "text-white"}`}>
        {value}
      </span>
    </div>
  );
}
