"use client";
import { useState, useEffect } from "react";
import { useTripPlanner } from "@/context/TripPlannerContext";
import { useLanguage } from "@/context/LanguageContext";

const destinations = [
  "Serengeti National Park",
  "Ngorongoro Crater",
  "Zanzibar",
  "Mount Kilimanjaro",
  "Mikumi National Park",
  "Lake Manyara",
  "Ruaha National Park",
];

const budgets = [
  "Under $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Custom Budget",
];

/** Local calendar date as YYYY-MM-DD so the picker cannot go before today. */
function todayISODate() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function TripPlannerModal() {
  const { isOpen, closeModal, preFill } = useTripPlanner();
  const { t } = useLanguage();

  const travellers = [t.planner.t1, t.planner.t2, t.planner.t34, t.planner.t5];

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numTravellers, setNumTravellers] = useState("");
  const [budget, setBudget] = useState("");

  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [minDate, setMinDate] = useState("");

  /* Calendar must start from today — past days cannot be selected. */
  useEffect(() => {
    setMinDate(todayISODate());
  }, []);

  /* Set default traveller when translations load */
  useEffect(() => {
    if (!numTravellers && travellers[1]) {
      setNumTravellers(travellers[1]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  /* Pre-fill fields from hero card */
  useEffect(() => {
    if (isOpen) {
      const today = todayISODate();
      setMinDate(today);
      if (preFill.destination) setDestination(preFill.destination);
      if (preFill.startDate && preFill.startDate >= today) setStartDate(preFill.startDate);
      if (preFill.endDate && preFill.endDate >= today) setEndDate(preFill.endDate);
      if (preFill.numTravellers) setNumTravellers(preFill.numTravellers);
      setTimeout(() => setMounted(true), 10);
    } else {
      setMounted(false);
      setTimeout(() => {
        setConfirmed(false);
        setApiError("");
        setFullName("");
        setEmail("");
        setPhone("");
        setDestination("");
        setStartDate("");
        setEndDate("");
        setNumTravellers(travellers[1] ?? "");
        setBudget("");
      }, 300);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Lock body scroll when open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleBookNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          destination,
          startDate,
          endDate,
          numTravellers,
          budget,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setApiError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setConfirmed(true);
      setTimeout(() => closeModal(), 6000);
    } catch {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label={t.planner.aria}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeModal}
      />

      {/* Modal card */}
      <div
        className={`relative z-10 w-full max-w-lg bg-[#141414] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden transition-all duration-300 ${
          mounted ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* ─── CONFIRMATION STATE ─── */}
        {confirmed ? (
          <div className="flex flex-col items-center justify-center text-center px-8 py-16 min-h-[360px]">
            {/* Animated checkmark */}
            <div className="w-20 h-20 rounded-full bg-[var(--gold)]/15 border-2 border-[var(--gold)] flex items-center justify-center mb-6 animate-pulse-gold">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <p className="section-label mb-3">{t.planner.received}</p>
            <h2 className="text-2xl font-bold text-white mb-3">{t.planner.thanks}</h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {t.planner.confirmBody}{" "}
              <span className="text-[var(--gold)] font-semibold">{t.planner.hours}</span>.
            </p>

            <div className="mt-8 w-full max-w-xs">
              <button onClick={closeModal} className="btn-gold w-full justify-center text-sm py-3">
                {t.planner.close}
              </button>
            </div>

            {/* Auto-close progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/8 overflow-hidden">
              <div
                className="h-full bg-[var(--gold)] origin-left"
                style={{ animation: "shrink 6s linear forwards" }}
              />
            </div>
          </div>
        ) : (
          <>
            {/* ─── FORM STATE ─── */}
            {/* Header */}
            <div className="flex items-start justify-between p-6 pb-5 border-b border-white/8">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--gold)]/12 border border-[var(--gold)]/25 flex items-center justify-center shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth="1.8"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg leading-tight">
                    {t.planner.title}
                  </h2>
                  <p className="text-white/45 text-xs mt-0.5">
                    {t.planner.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/8 ml-3 shrink-0"
                aria-label={t.planner.close}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable form body */}
            <div className="overflow-y-auto max-h-[75vh]">
              <form onSubmit={handleBookNow} className="p-6 space-y-4">

                {/* ── CONTACT DETAILS SECTION ── */}
                <div className="pb-1">
                  <p className="text-[var(--gold)] text-[10px] font-bold tracking-[0.18em] uppercase mb-3">
                    {t.planner.contact}
                  </p>

                  {/* Full Name */}
                  <div className="mb-3">
                    <label className="block text-white/55 text-[11px] font-semibold tracking-wider uppercase mb-1.5">
                      {t.planner.fullName}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Meck Robert"
                        className="input-dark pl-9 text-sm"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="block text-white/55 text-[11px] font-semibold tracking-wider uppercase mb-1.5">
                      {t.planner.email} <span className="text-[var(--gold)]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="input-dark pl-9 text-sm"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-white/55 text-[11px] font-semibold tracking-wider uppercase mb-1.5">
                      {t.planner.phone} <span className="text-[var(--gold)]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="input-dark pl-9 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/8" />

                {/* ── TRIP DETAILS SECTION ── */}
                <div className="pb-1">
                  <p className="text-[var(--gold)] text-[10px] font-bold tracking-[0.18em] uppercase mb-3">
                    {t.planner.trip}
                  </p>

                  {/* Destination */}
                  <div className="mb-3">
                    <label className="block text-white/55 text-[11px] font-semibold tracking-wider uppercase mb-1.5">
                      {t.planner.destination} <span className="text-[var(--gold)]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="input-dark pl-9 pr-8 text-sm cursor-pointer"
                      >
                        <option value="">{t.planner.selectDestination}</option>
                        {destinations.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/35">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Travel Dates */}
                  <div className="mb-3">
                    <label className="block text-white/55 text-[11px] font-semibold tracking-wider uppercase mb-1.5">
                      {t.planner.dates}
                    </label>
                    <div className="flex items-center gap-2 bg-[var(--dark-3)] rounded-lg border border-white/10 px-3 py-2.5 focus-within:border-[var(--gold)] transition-colors">
                      <input
                        type="date"
                        value={startDate}
                        min={minDate}
                        onChange={(e) => {
                          const nextStart = e.target.value;
                          setStartDate(nextStart);
                          if (endDate && nextStart && endDate < nextStart) {
                            setEndDate("");
                          }
                        }}
                        className="bg-transparent outline-none text-sm text-white/70 flex-1 min-w-0 [color-scheme:dark]"
                      />
                      <span className="text-white/20 text-sm">→</span>
                      <input
                        type="date"
                        value={endDate}
                        min={startDate || minDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-transparent outline-none text-sm text-white/70 flex-1 min-w-0 [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Number of Travellers */}
                  <div className="mb-3">
                    <label className="block text-white/55 text-[11px] font-semibold tracking-wider uppercase mb-1.5">
                      {t.planner.travellers}
                    </label>
                    <div className="relative">
                      <select
                        value={numTravellers}
                        onChange={(e) => setNumTravellers(e.target.value)}
                        className="input-dark pl-9 pr-8 text-sm cursor-pointer"
                      >
                        {travellers.map((tv) => (
                          <option key={tv} value={tv}>{tv}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/35">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-white/55 text-[11px] font-semibold tracking-wider uppercase mb-1.5">
                      {t.planner.budget} <span className="text-[var(--gold)]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="input-dark pl-9 pr-8 text-sm cursor-pointer"
                      >
                        <option value="">{t.planner.selectBudget}</option>
                        {budgets.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/35">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                    {budget && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="text-[10px] text-[var(--gold)] bg-[var(--gold)]/10 border border-[var(--gold)]/25 px-2.5 py-1 rounded-full font-semibold">
                          ✓ {budget}
                        </span>
                        <button
                          type="button"
                          onClick={() => setBudget("")}
                          className="text-[10px] text-white/35 hover:text-white/60 transition-colors"
                        >
                          {t.planner.change}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* API Error */}
                {apiError && (
                  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span className="text-red-400 text-xs">{apiError}</span>
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-white/8" />

                {/* Book Now */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full justify-center text-sm py-3.5 rounded-xl font-bold tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      {t.planner.sending}
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 12V22H4V12" />
                        <path d="M22 7H2v5h20V7z" />
                        <path d="M12 22V7" />
                        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                      </svg>
                      {t.planner.book}
                    </>
                  )}
                </button>
              </form>
            </div>
          </>
        )}
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%;   }
        }
      `}</style>
    </div>
  );
}
