import Link from "next/link";

const packages = [
  {
    title: "3 Days Serengeti Safari",
    location: "Serengeti National Park",
    days: "3 Days",
    nights: "2 Nights",
    price: "$1,200",
    tag: "Classic Safari",
    emoji: "🦁",
    gradient: "from-amber-900/60 to-black/90",
    bg: "bg-amber-950/30",
  },
  {
    title: "5 Days Ngorongoro & Tarangire",
    location: "Ngorongoro & Tarangire",
    days: "5 Days",
    nights: "4 Nights",
    price: "$1,850",
    tag: "Family Safari",
    emoji: "🐘",
    gradient: "from-emerald-900/60 to-black/90",
    bg: "bg-emerald-950/30",
    featured: true,
  },
  {
    title: "7 Days Zanzibar Beach Escape",
    location: "Zanzibar",
    days: "7 Days",
    nights: "6 Nights",
    price: "$1,650",
    tag: "Beach & Safari",
    emoji: "🌊",
    gradient: "from-cyan-900/60 to-black/90",
    bg: "bg-cyan-950/30",
  },
  {
    title: "8 Days Kilimanjaro Adventure",
    location: "Mount Kilimanjaro",
    days: "8 Days",
    nights: "7 Nights",
    price: "$2,800",
    tag: "Luxury Safari",
    emoji: "🏔️",
    gradient: "from-blue-900/60 to-black/90",
    bg: "bg-blue-950/30",
  },
];

const safariTypes = [
  { label: "Classic Safaris", sub: "3–5 Days" },
  { label: "Luxury Safaris", sub: "5–10 Days" },
  { label: "Family Safaris", sub: "4–8 Days" },
  { label: "Photography Safaris", sub: "7–12 Days" },
  { label: "Beach & Safari", sub: "7–14 Days" },
];

export default function PackagesSection() {
  return (
    <section className="bg-[var(--dark)] py-20">
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="section-label mb-2">Tailor-Made Journeys</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Safari Packages
          </h2>
          <p className="text-white/55 text-sm leading-relaxed">
            Choose from our carefully crafted safari packages or let us create
            a custom itinerary just for you.
          </p>
        </div>

        {/* Safari Type Pills */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {safariTypes.map((type, i) => (
            <button
              key={type.label}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                ${i === 0
                  ? "bg-[var(--gold)] text-black border-[var(--gold)]"
                  : "bg-transparent text-white/70 border-white/20 hover:border-[var(--gold)] hover:text-[var(--gold)]"
                }`}
            >
              <span>{type.label}</span>
              <span className="ml-1.5 text-xs opacity-60">{type.sub}</span>
            </button>
          ))}
        </div>

        {/* Section sub-header */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-semibold text-white">Featured Safari Packages</h3>
          <Link
            href="/safari-packages"
            className="flex items-center gap-1.5 text-[var(--gold)] text-sm font-semibold hover:gap-2.5 transition-all"
          >
            View All Packages
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {packages.map((pkg) => (
            <div
              key={pkg.title}
              className={`relative rounded-xl border overflow-hidden card-hover group cursor-pointer
                ${pkg.featured
                  ? "border-[var(--gold)]/50 shadow-lg shadow-[var(--gold)]/10"
                  : "border-white/8"
                }`}
            >
              {/* Featured badge */}
              {pkg.featured && (
                <div className="absolute top-3 right-3 z-10 bg-[var(--gold)] text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  Popular
                </div>
              )}

              {/* Image placeholder with gradient */}
              <div className={`h-44 relative flex items-center justify-center ${pkg.bg} border-b border-white/8`}>
                <span className="text-6xl select-none">{pkg.emoji}</span>
                <div className={`absolute inset-0 bg-gradient-to-b ${pkg.gradient}`} />
              </div>

              {/* Content */}
              <div className="p-5 bg-[var(--dark-3)]">
                <span className="text-[var(--gold)] text-[10px] font-bold tracking-widest uppercase">
                  {pkg.tag}
                </span>
                <h4 className="text-white font-semibold text-base mt-1 mb-2 leading-snug">
                  {pkg.title}
                </h4>

                <div className="flex items-center gap-1 text-white/50 text-xs mb-4">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {pkg.location}
                </div>

                <div className="flex items-center gap-3 mb-4 text-xs text-white/60">
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {pkg.days}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                    {pkg.nights}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[var(--gold)] font-bold text-lg">{pkg.price}</span>
                    <span className="text-white/40 text-xs ml-1">/ person</span>
                  </div>
                  <Link
                    href="/safari-packages"
                    className="flex items-center gap-1.5 text-sm font-semibold text-white bg-white/10 hover:bg-[var(--gold)] hover:text-black px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    View Details
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
