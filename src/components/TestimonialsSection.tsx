const testimonials = [
  {
    name: "Sarah Mitchell",
    country: "United Kingdom",
    flag: "🇬🇧",
    text: "Impelisa gave us the trip of a lifetime! The Serengeti migration was breathtaking, and our guide Daniel knew every animal by name. Truly world-class service.",
    trip: "Serengeti Safari, 5 Days",
    rating: 5,
    avatar: "SM",
  },
  {
    name: "James & Lisa Kowalski",
    country: "United States",
    flag: "🇺🇸",
    text: "From the moment we landed to departure, everything was flawlessly arranged. The Ngorongoro Crater at dawn — we'll never forget it. Worth every penny!",
    trip: "Ngorongoro & Zanzibar, 10 Days",
    rating: 5,
    avatar: "JK",
  },
  {
    name: "Priya Sharma",
    country: "India",
    flag: "🇮🇳",
    text: "Impelisa's attention to detail is unmatched. Our family safari with two kids was managed perfectly — safe, exciting, and deeply educational.",
    trip: "Family Safari, 7 Days",
    rating: 5,
    avatar: "PS",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#0A0A0A] py-20 relative overflow-hidden">
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
          <p className="section-label mb-2">Traveler Stories</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            What Our Guests Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-[var(--dark-3)] border border-white/8 rounded-xl p-7 card-hover relative"
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
