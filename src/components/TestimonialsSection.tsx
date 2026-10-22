"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const testimonials = [
    {
      name: "Sarah Mitchell",
      country: "United Kingdom",
      flag: "🇬🇧",
      text: t.testimonials.t1,
      trip: t.testimonials.t1Trip,
      rating: 5,
      avatar: "SM",
    },
    {
      name: "James & Lisa Kowalski",
      country: "United States",
      flag: "🇺🇸",
      text: t.testimonials.t2,
      trip: t.testimonials.t2Trip,
      rating: 5,
      avatar: "JK",
    },
    {
      name: "Priya Sharma",
      country: "India",
      flag: "🇮🇳",
      text: t.testimonials.t3,
      trip: t.testimonials.t3Trip,
      rating: 5,
      avatar: "PS",
    },
  ];

  return (
    <section className="bg-[var(--bg)] py-20 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, var(--gold) 0%, transparent 50%),
                              radial-gradient(circle at 80% 50%, var(--gold) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="section-label mb-2">{t.testimonials.label}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            {t.testimonials.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-[var(--bg-3)] border border-white/8 rounded-xl p-7 card-hover relative"
            >
              {/* Quote mark */}
              <div className="text-[var(--gold)]/20 text-7xl font-serif leading-none absolute top-4 right-6 select-none">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--gold)">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>

              <p className="text-white/70 text-sm leading-relaxed mb-6 relative z-10">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] font-bold text-xs shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm flex items-center gap-2">
                    {t.name}
                    <span>{t.flag}</span>
                  </div>
                  <div className="text-white/40 text-xs">{t.trip}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
