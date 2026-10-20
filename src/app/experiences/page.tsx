import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiences | Impelisa Travel & Tours Africa",
  description:
    "Go beyond the ordinary. Experience the real Africa through unique adventures – game drives, hot air balloon safaris, cultural visits, marine adventures, hiking & trekking, and beach relaxation.",
};

const experiences = [
  {
    title: "Game Drives",
    subtitle: "Get up close with Africa's wildlife",
    desc: "Explore the African bush at golden hour with an expert naturalist guide. Spot the Big Five in their natural habitat as dawn breaks over the savannah.",
    image: "/images/game-drive.png",
    duration: "4–8 hours",
    difficulty: "Easy",
    tag: "Wildlife",
  },
  {
    title: "Hot Air Balloon Safari",
    subtitle: "A new perspective of the wild",
    desc: "Drift silently above the Serengeti at sunrise, watching herds move through the plains. End with a champagne bush breakfast below.",
    image: "/images/hot.jpeg",
    duration: "3–4 hours",
    difficulty: "Easy",
    tag: "Adventure",
  },
  {
    title: "Cultural Visits",
    subtitle: "Meet local communities",
    desc: "Immerse yourself in Maasai culture, visit authentic villages, and learn age-old traditions from welcoming local communities.",
    image: "/images/masai.jpeg",
    duration: "Half Day",
    difficulty: "Easy",
    tag: "Culture",
  },
  {
    title: "Marine Adventures",
    subtitle: "Explore the Indian Ocean",
    desc: "Snorkel vibrant coral reefs, swim with whale sharks, or dive into crystal-clear waters teeming with colourful marine life off Zanzibar.",
    image: "/images/marine.jpeg",
    duration: "Full Day",
    difficulty: "Moderate",
    tag: "Marine",
  },
  {
    title: "Hiking & Trekking",
    subtitle: "Adventure in every step",
    desc: "Trek through rainforests, crater rims, and alpine deserts. From gentle nature walks to the mighty summit of Kilimanjaro.",
    image: "/images/hikking.jpeg",
    duration: "1–9 Days",
    difficulty: "Moderate–Hard",
    tag: "Adventure",
  },
  {
    title: "Beach Relaxation",
    subtitle: "Unwind in paradise",
    desc: "Sink into powdery white sands on Zanzibar's pristine beaches. Enjoy turquoise waters, fresh seafood, and spectacular Indian Ocean sunsets.",
    image: "/images/beach1.jpeg",
    duration: "Flexible",
    difficulty: "Easy",
    tag: "Beach",
  },
];

const stats = [
  { value: "12+", label: "Unique Experience Types" },
  { value: "500+", label: "Adventures Delivered" },
  { value: "98%", label: "Guest Satisfaction" },
  { value: "15+", label: "Years of Expertise" },
];

const difficultyColor: Record<string, string> = {
  Easy: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Moderate: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "Moderate–Hard": "text-orange-400 bg-orange-400/10 border-orange-400/20",
};

export default function ExperiencesPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        label="More Than a Trip"
        title="Unforgettable Experiences"
        subtitle="Go beyond the ordinary. Experience the real Africa through unique adventures, culture, and wildlife encounters."
        imageSrc="/images/hero-safari.png"
        imageAlt="Hot air balloon over the Serengeti"
      />

      {/* Stats Bar */}
      <section className="bg-[var(--gold)] py-5">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-black font-bold text-2xl">{stat.value}</div>
                <div className="text-black/70 text-xs font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="bg-[var(--dark)] py-16">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="section-label mb-2">Hand-Curated</p>
            <h2 className="text-3xl font-bold text-white mb-3">
              Choose Your Adventure
            </h2>
            <p className="text-white/55 text-sm leading-relaxed">
              From heart-pounding wildlife encounters to serene beach sunsets, every experience is guided by our passionate local experts.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <div
                key={exp.title}
                className="rounded-xl overflow-hidden border border-white/8 card-hover group bg-[var(--dark-3)]"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                  
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-bold bg-[var(--gold)] text-black px-2.5 py-1 rounded-full uppercase tracking-wide">
                      {exp.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-white font-bold text-base mb-0.5">{exp.title}</h3>
                  <p className="text-[var(--gold)] text-xs font-semibold mb-3">{exp.subtitle}</p>
                  <p className="text-white/55 text-sm leading-relaxed mb-4">{exp.desc}</p>

                  <div className="flex items-center gap-2 mb-5 flex-wrap">
                    <span className="flex items-center gap-1 text-xs text-white/50 bg-white/8 px-2.5 py-1 rounded-full border border-white/10">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {exp.duration}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${difficultyColor[exp.difficulty]}`}>
                      {exp.difficulty}
                    </span>
                  </div>

                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2 text-sm font-semibold bg-white/8 hover:bg-[var(--gold)] hover:text-black text-white py-2.5 rounded-lg transition-all duration-200"
                  >
                    Book This Experience
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[var(--dark-2)] py-16 border-t border-white/8">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Simple Process</p>
            <h2 className="text-3xl font-bold text-white">How It Works</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Experience",
                desc: "Browse our curated experiences or tell us your dream adventure.",
              },
              {
                step: "02",
                title: "Customize & Confirm",
                desc: "We tailor every detail – dates, group size, and special requirements.",
              },
              {
                step: "03",
                title: "Live the Adventure",
                desc: "Arrive, relax, and let our expert guides create memories that last a lifetime.",
              },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-14 h-14 rounded-full border-2 border-[var(--gold)] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[var(--gold)] font-bold text-sm">{step.step}</span>
                </div>
                <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/contact" className="btn-gold">
              Start Planning
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
