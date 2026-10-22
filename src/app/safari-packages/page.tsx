import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safari Packages | Impelisa Travel & Tours Africa",
  description:
    "Choose from our expertly crafted safari packages – Classic Safaris, Luxury Safaris, Family Safaris, Photography Safaris, Beach & Safari, and Custom itineraries.",
};

const safariTypes = [
  { label: "Classic Safaris", sub: "3–5 Days", active: true },
  { label: "Luxury Safaris", sub: "5–10 Days" },
  { label: "Family Safaris", sub: "4–8 Days" },
  { label: "Photography Safaris", sub: "7–12 Days" },
  { label: "Beach & Safari", sub: "7–14 Days" },
];

const packages = [
  {
    title: "3 Days Serengeti Safari",
    location: "Serengeti National Park",
    days: "3 Days",
    nights: "2 Nights",
    price: "$1,200",
    tag: "Classic Safari",
    image: "/images/serengeti.jpg",
    featured: false,
    includes: ["Game drives", "Park fees", "Accommodation", "All meals"],
    desc: "Experience the heart of the Serengeti – witness lions, elephants, and the iconic open savannah.",
  },
  {
    title: "5 Days Ngorongoro & Tarangire",
    location: "Ngorongoro & Tarangire",
    days: "5 Days",
    nights: "4 Nights",
    price: "$1,850",
    tag: "Family Safari",
    image: "/images/ngorongoro.jpg",
    featured: true,
    includes: ["Game drives", "Crater tour", "Park fees", "All meals", "Family guide"],
    desc: "Explore two of Tanzania's most diverse ecosystems packed with wildlife and stunning landscapes.",
  },
  {
    title: "7 Days Zanzibar Beach Escape",
    location: "Zanzibar",
    days: "7 Days",
    nights: "6 Nights",
    price: "$1,650",
    tag: "Beach & Safari",
    image: "/images/zanzibar.jpg",
    featured: false,
    includes: ["Beach resort", "Snorkeling", "Stone Town tour", "Spice tour", "All meals"],
    desc: "Combine a short safari with a luxurious beach holiday on the idyllic island of Zanzibar.",
  },
  {
    title: "8 Days Kilimanjaro Adventure",
    location: "Mount Kilimanjaro",
    days: "8 Days",
    nights: "7 Nights",
    price: "$2,800",
    tag: "Luxury Safari",
    image: "/images/kilimanjaro.jpg",
    featured: false,
    includes: ["Mountain guide", "Porters", "All meals", "Camping gear", "Park fees"],
    desc: "Summit Africa's highest mountain via the Machame Route with expert guides and full support.",
  },
  {
    title: "10 Days Photography Safari",
    location: "Serengeti & Ngorongoro",
    days: "10 Days",
    nights: "9 Nights",
    price: "$3,400",
    tag: "Photography Safari",
    image: "/images/safari-jeep.jpg",
    featured: false,
    includes: ["Expert photo guide", "Specialist vehicle", "All meals", "Park fees", "Daily briefings"],
    desc: "Capture the magic of Africa with a dedicated photography guide and prime sunrise/sunset positions.",
  },
  {
    title: "14 Days Ultimate Tanzania",
    location: "Tanzania – Full Circuit",
    days: "14 Days",
    nights: "13 Nights",
    price: "$5,200",
    tag: "Luxury Safari",
    image: "/images/mikumi.jpg",
    featured: false,
    includes: ["Luxury lodges", "All park fees", "Flights", "All meals", "Private guide"],
    desc: "The ultimate Tanzania experience – Serengeti, Ngorongoro, Kilimanjaro, and Zanzibar in one journey.",
  },
];

export default function SafariPackagesPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        label="Tailor-Made Journeys"
        title="Safari Packages"
        subtitle="Choose from our carefully crafted safari packages or let us create a custom itinerary just for you."
        imageSrc="/images/safari-jeep.jpg"
        imageAlt="Safari jeep in the savannah"
      />

      {/* Type Filter */}
      <section className="bg-[var(--bg-2)] border-b border-white/8 sticky top-[72px] z-40">
        <div className="max-w-[1320px] mx-auto px-6 py-4 flex gap-3 overflow-x-auto scrollbar-none">
          {safariTypes.map((type) => (
            <button
              key={type.label}
              className={`shrink-0 flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium transition-all border ${
                type.active
                  ? "bg-[var(--gold)] text-black border-[var(--gold)]"
                  : "bg-transparent text-white/70 border-white/20 hover:border-[var(--gold)] hover:text-[var(--gold)]"
              }`}
            >
              {type.label}
              <span className="text-[11px] opacity-60">{type.sub}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section className="bg-[var(--bg)] py-16">
        <div className="max-w-[1320px] mx-auto px-6">
          {/* Sub-header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="section-label mb-1">Featured Packages</p>
              <h2 className="text-2xl font-bold text-white">
                {packages.length} Safari Packages Available
              </h2>
            </div>
            <Link
              href="/contact"
              className="btn-outline-gold text-sm"
            >
              Custom Package
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Package Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.title}
                className={`relative rounded-xl overflow-hidden card-hover border group ${
                  pkg.featured
                    ? "border-[var(--gold)]/50 shadow-lg shadow-[var(--gold)]/10"
                    : "border-white/8"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute top-3 right-3 z-10 bg-[var(--gold)] text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    Popular
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-3 left-3 bg-[var(--gold)]/90 text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    {pkg.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 bg-[var(--bg-3)]">
                  <h3 className="text-white font-bold text-base leading-snug mb-1">{pkg.title}</h3>
                  <p className="text-white/45 text-xs flex items-center gap-1 mb-3">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {pkg.location}
                  </p>
                  <p className="text-white/55 text-sm leading-relaxed mb-4">{pkg.desc}</p>

                  {/* Duration */}
                  <div className="flex items-center gap-3 mb-4 text-xs text-white/55">
                    <span className="flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {pkg.days}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                      {pkg.nights}
                    </span>
                  </div>

                  {/* Includes */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {pkg.includes.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="text-[10px] text-white/60 bg-white/8 px-2.5 py-1 rounded-full border border-white/10"
                      >
                        {item}
                      </span>
                    ))}
                    {pkg.includes.length > 3 && (
                      <span className="text-[10px] text-[var(--gold)] bg-[var(--gold)]/10 px-2.5 py-1 rounded-full border border-[var(--gold)]/20">
                        +{pkg.includes.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[var(--gold)] font-bold text-xl">{pkg.price}</span>
                      <span className="text-white/40 text-xs ml-1">/ person</span>
                    </div>
                    <Link
                      href="/contact"
                      className="flex items-center gap-1.5 text-sm font-semibold text-white bg-white/10 hover:bg-[var(--gold)] hover:text-black px-4 py-2 rounded-lg transition-all duration-200"
                    >
                      View Details
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Package CTA */}
      <section className="bg-[var(--bg-2)] py-16 border-t border-white/8">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="rounded-2xl bg-[var(--bg-3)] border border-[var(--gold)]/20 p-10 md:p-14 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <p className="section-label mb-3">Bespoke Itineraries</p>
              <h2 className="text-3xl font-bold text-white mb-3">
                Build Your Dream Safari
              </h2>
              <p className="text-white/55 text-sm leading-relaxed max-w-md">
                Can&apos;t find the perfect package? Our expert team will design a fully personalised itinerary around your dates, group size, interests, and budget.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-gold">
                Request Custom Package
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/destinations" className="btn-outline text-sm">
                Browse Destinations
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
