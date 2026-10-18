import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import TripPlannerButton from "@/components/TripPlannerButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Destinations | Impelisa Travel & Tours Africa",
  description:
    "Discover Africa's most breathtaking destinations – Serengeti, Zanzibar, Mount Kilimanjaro, Ngorongoro Crater, and more. Explore with Impelisa Travel & Tours Africa.",
};

const categories = [
  { label: "All Destinations", active: true },
  { label: "National Parks" },
  { label: "Beaches" },
  { label: "Mountains" },
  { label: "Cultural Sites" },
];

const destinations = [
  {
    name: "Mount Kilimanjaro",
    location: "Tanzania",
    image: "/images/kilimanjaro.jpg",
    tag: "Mountain",
    duration: "7–9 Days",
    price: "From $2,800",
    desc: "Conquer Africa's highest peak and experience panoramic views that stretch beyond imagination.",
    featured: true,
  },
  {
    name: "Serengeti National Park",
    location: "Tanzania",
    image: "/images/serengeti.jpg",
    tag: "National Park",
    duration: "3–7 Days",
    price: "From $1,200",
    desc: "Witness the world-famous Great Migration and encounter the Big Five in their natural habitat.",
    featured: true,
  },
  {
    name: "Zanzibar",
    location: "Tanzania",
    image: "/images/zanzibar.jpg",
    tag: "Beach",
    duration: "5–10 Days",
    price: "From $1,650",
    desc: "Relax on pristine white-sand beaches, explore Stone Town's spice markets and turquoise waters.",
    featured: false,
  },
  {
    name: "Ngorongoro Crater",
    location: "Tanzania",
    image: "/images/ngorongoro.jpg",
    tag: "National Park",
    duration: "2–4 Days",
    price: "From $950",
    desc: "Descend into the world's largest intact volcanic caldera teeming with extraordinary wildlife.",
    featured: false,
  },
  {
    name: "Mikumi National Park",
    location: "Tanzania",
    image: "/images/mikumi.jpg",
    tag: "National Park",
    duration: "2–5 Days",
    price: "From $800",
    desc: "Tanzania's most accessible park – abundant elephants, lions, and giraffes await.",
    featured: false,
  },
  {
    name: "Lake Manyara",
    location: "Tanzania",
    image: "/images/serengeti.jpg",
    tag: "National Park",
    duration: "1–3 Days",
    price: "From $600",
    desc: "Famous for its tree-climbing lions and vast flocks of pink flamingos on a soda lake.",
    featured: false,
  },
];

export default function DestinationsPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        label="Explore · Discover · Experience"
        title="Top Destinations"
        subtitle="Discover Africa's most breathtaking places, from iconic national parks to pristine beaches and majestic mountains."
        imageSrc="/images/hero-safari.png"
        imageAlt="African safari landscape"
      />

      {/* Category Filter */}
      <section className="bg-[var(--dark-2)] border-b border-white/8 sticky top-[72px] z-40">
        <div className="max-w-[1320px] mx-auto px-6 py-4 flex gap-3 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all border ${
                cat.active
                  ? "bg-[var(--gold)] text-black border-[var(--gold)]"
                  : "bg-transparent text-white/70 border-white/20 hover:border-[var(--gold)] hover:text-[var(--gold)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="bg-[var(--dark)] py-16">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="section-label mb-1">Tanzania & East Africa</p>
              <h2 className="text-2xl font-bold text-white">
                {destinations.length} Destinations
              </h2>
            </div>
            <span className="text-white/40 text-sm">Sorted by popularity</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <div
                key={dest.name}
                className={`dest-card rounded-xl overflow-hidden card-hover border group ${
                  dest.featured ? "border-[var(--gold)]/40 shadow-lg shadow-[var(--gold)]/8" : "border-white/8"
                }`}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 gradient-overlay" />
                  {dest.featured && (
                    <span className="absolute top-3 left-3 bg-[var(--gold)] text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                      Featured
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white/80 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    {dest.tag}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <h3 className="text-white font-bold text-lg leading-tight">{dest.name}</h3>
                      <p className="text-white/65 text-xs flex items-center gap-1 mt-0.5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        {dest.location}
                      </p>
                    </div>
                    <button className="arrow-btn shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 bg-[var(--dark-3)]">
                  <p className="text-white/55 text-sm leading-relaxed mb-4">{dest.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-white/50">
                      <span className="flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {dest.duration}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-[var(--gold)] font-bold text-base">{dest.price}</div>
                    </div>
                  </div>
                  <TripPlannerButton className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold bg-white/8 hover:bg-[var(--gold)] hover:text-black text-white py-2.5 rounded-lg transition-all duration-200">
                    Explore This Destination
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </TripPlannerButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--dark-2)] py-16 border-t border-white/8">
        <div className="max-w-[1320px] mx-auto px-6 text-center">
          <p className="section-label mb-3">Custom Itineraries</p>
          <h2 className="text-3xl font-bold text-white mb-4">Can&apos;t Find Your Dream Destination?</h2>
          <p className="text-white/55 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
            Our expert guides can craft a bespoke safari experience tailored exactly to your interests, timeline, and budget.
          </p>
          <TripPlannerButton className="btn-gold">
            Plan a Custom Trip
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </TripPlannerButton>
        </div>
      </section>

      <Footer />
    </main>
  );
}
