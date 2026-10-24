"use client";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import TripPlannerButton from "@/components/TripPlannerButton";
import { useLanguage } from "@/context/LanguageContext";
import { interpolate } from "@/i18n";

export default function DestinationsPage() {
  const { t } = useLanguage();
  const categories = [
    { label: t.destPage.all, active: true },
    { label: t.destPage.parks },
    { label: t.destPage.beaches },
    { label: t.destPage.mountains },
    { label: t.destPage.culture },
  ];
  const destinations = [
    {
      name: "Mount Kilimanjaro",
      location: "Tanzania",
      image: "/images/kilimanjaro.jpg",
      tag: t.destPage.mountain,
      desc: t.destPage.d1desc,
      featured: true,
    },
    {
      name: "Serengeti National Park",
      location: "Tanzania",
      image: "/images/serengeti.jpg",
      tag: t.destPage.park,
      desc: t.destPage.d2desc,
      featured: true,
    },
    {
      name: "Zanzibar",
      location: "Tanzania",
      image: "/images/zanzibar.jpg",
      tag: t.destPage.beach,
      desc: t.destPage.d3desc,
      featured: false,
    },
    {
      name: "Ngorongoro Crater",
      location: "Tanzania",
      image: "/images/ngorongoro.jpg",
      tag: t.destPage.park,
      desc: t.destPage.d4desc,
      featured: false,
    },
    {
      name: "Mikumi National Park",
      location: "Tanzania",
      image: "/images/mikumi.jpg",
      tag: t.destPage.park,
      desc: t.destPage.d5desc,
      featured: false,
    },
    {
      name: "Lake Manyara",
      location: "Tanzania",
      image: "/images/serengeti.jpg",
      tag: t.destPage.park,
      desc: t.destPage.d6desc,
      featured: false,
    },
  ];

  return (
    <main>
      <Navbar />
      <PageHero
        label={t.destPage.label}
        title={t.destPage.title}
        subtitle={t.destPage.subtitle}
        imageSrc="/images/hero-safari.png"
        imageAlt="African safari landscape"
      />

      {/* Category Filter */}
      <section className="bg-[var(--bg-2)] border-b border-white/8 sticky top-[72px] z-40">
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
      <section className="bg-[var(--bg)] py-16">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="section-label mb-1">{t.destPage.region}</p>
              <h2 className="text-2xl font-bold text-white">
                {interpolate(t.destPage.count, { n: destinations.length })}
              </h2>
            </div>
            <span className="text-white/40 text-sm">{t.destPage.sorted}</span>
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
                      {t.destPage.featured}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white/80 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    {dest.tag}
                  </span>
                  <div className="on-media absolute bottom-4 left-4 right-4 flex items-end justify-between">
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
                <div className="p-5 bg-[var(--bg-3)]">
                  <p className="text-white/55 text-sm leading-relaxed mb-4">{dest.desc}</p>
                
                  <TripPlannerButton className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold bg-white/8 hover:bg-[var(--gold)] hover:text-black text-white py-2.5 rounded-lg transition-all duration-200">
                    {t.destPage.explore}
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
      <section className="bg-[var(--bg-2)] py-16 border-t border-white/8">
        <div className="max-w-[1320px] mx-auto px-6 text-center">
          <p className="section-label mb-3">{t.destPage.customLabel}</p>
          <h2 className="text-3xl font-bold text-white mb-4">{t.destPage.customTitle}</h2>
          <p className="text-white/55 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
            {t.destPage.customBody}
          </p>
          <TripPlannerButton className="btn-gold">
            {t.destPage.customCta}
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
