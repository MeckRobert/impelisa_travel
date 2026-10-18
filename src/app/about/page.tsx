import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Impelisa Travel & Tours Africa",
  description:
    "Learn about Impelisa Travel & Tours Africa – our story, mission, and the passionate team behind Tanzania's most trusted safari company.",
};

const values = [
  {
    icon: "🏆",
    title: "Trusted & Certified",
    subtitle: "Tour Operator",
    desc: "Fully licensed and certified by Tanzania's national tourism authorities with a proven track record.",
  },
  {
    icon: "🌍",
    title: "Local Expertise",
    subtitle: "Global Standards",
    desc: "Born and raised in Tanzania, our guides bring unmatched local knowledge and international hospitality.",
  },
  {
    icon: "🌱",
    title: "Sustainable Travel",
    subtitle: "for a Better Tomorrow",
    desc: "We partner with local communities and conservation projects to ensure responsible, eco-friendly tourism.",
  },
];

const team = [
  {
    name: "James Mwangi",
    role: "Founder & Lead Safari Guide",
    exp: "20+ years",
    emoji: "👨🏿",
    bio: "Born in the shadow of Kilimanjaro, James has guided thousands of travellers to transformative African adventures.",
  },
  {
    name: "Amina Hassan",
    role: "Head of Operations",
    exp: "12+ years",
    emoji: "👩🏿",
    bio: "Amina ensures every itinerary runs flawlessly, from airport pickup to final farewell with a personal touch.",
  },
  {
    name: "David Osei",
    role: "Senior Wildlife Guide",
    exp: "15+ years",
    emoji: "👨🏿‍🦱",
    bio: "David's encyclopedic knowledge of African fauna makes every game drive an unforgettable educational journey.",
  },
];

const milestones = [
  { year: "2009", event: "Impelisa Travel & Tours founded in Dar es Salaam" },
  { year: "2012", event: "First international partnerships with European tour operators" },
  { year: "2016", event: "Expanded operations to Zanzibar and coastal Tanzania" },
  { year: "2019", event: "Reached 5,000 satisfied guests milestone" },
  { year: "2022", event: "Certified as a Sustainable Tourism Operator" },
  { year: "2026", event: "Serving guests from 45+ countries worldwide" },
];

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        label="Our Story"
        title="About Us"
        subtitle="At Impelisa Travel & Tours Africa, we turn your travel dreams into unforgettable realities."
        imageSrc="/images/serengeti.jpg"
        imageAlt="Serengeti landscape at sunset"
      />

      {/* Who We Are */}
      <section className="bg-[var(--dark)] py-20">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="section-label mb-3">Who We Are</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight">
                Passionate Storytellers<br />of the African Wild
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                Impelisa Travel & Tours Africa is a Tanzanian-based travel company specializing in safari adventures, beach holidays, cultural experiences, and tailor-made tours across East Africa. We are passionate about wildlife and creating memorable memories.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                Our mission is to provide safe, authentic, and life-changing travel experiences while supporting local communities and conservation efforts. Every trip we craft reflects our deep love for this extraordinary continent.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {values.map((v) => (
                  <div key={v.title} className="bg-[var(--dark-3)] rounded-xl p-4 border border-white/8 text-center">
                    <div className="text-2xl mb-2">{v.icon}</div>
                    <div className="text-white font-semibold text-xs leading-snug">{v.title}</div>
                    <div className="text-[var(--gold)] text-[10px] mt-0.5">{v.subtitle}</div>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="btn-gold text-sm">
                Learn More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Image collage */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl overflow-hidden h-48">
                <img src="/images/ngorongoro.jpg" alt="Ngorongoro" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden h-48 mt-6">
                <img src="/images/serengeti.jpg" alt="Serengeti" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden h-48">
                <img src="/images/zanzibar.jpg" alt="Zanzibar" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden h-48 mt-6">
                <img src="/images/kilimanjaro.jpg" alt="Kilimanjaro" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote banner */}
      <section className="relative overflow-hidden py-16">
        <img
          src="/images/hero-safari.png"
          alt="African sunset"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-black/80 to-[#0D0D0D]" />
        <div className="relative z-10 max-w-[1320px] mx-auto px-6 text-center">
          <blockquote className="text-2xl md:text-3xl font-light italic text-white/85 max-w-3xl mx-auto leading-relaxed">
            &ldquo;Travel is not just about places,<br />
            it&apos;s about people, culture and new perspectives.&rdquo;
          </blockquote>
          <p className="text-[var(--gold)] font-semibold text-sm mt-4 tracking-wider">
            — Impelisa Travel & Tours Africa
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-[var(--dark)] py-16">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Why Choose Us</p>
            <h2 className="text-3xl font-bold text-white">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-[var(--dark-3)] rounded-2xl p-8 border border-white/8 hover:border-[var(--gold)]/30 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-[var(--gold)]/10 flex items-center justify-center text-2xl mb-5 border border-[var(--gold)]/20">
                  {v.icon}
                </div>
                <h3 className="text-white font-bold text-base mb-1">{v.title}</h3>
                <p className="text-[var(--gold)] text-xs font-semibold mb-3">{v.subtitle}</p>
                <p className="text-white/55 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="bg-[var(--dark-2)] py-16 border-t border-white/8">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-label mb-2">The People Behind the Magic</p>
            <h2 className="text-3xl font-bold text-white">Meet Our Team</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-[var(--dark-3)] rounded-2xl p-8 border border-white/8 text-center card-hover">
                <div className="w-20 h-20 rounded-full bg-[var(--gold)]/10 border-2 border-[var(--gold)]/30 flex items-center justify-center text-4xl mx-auto mb-4">
                  {member.emoji}
                </div>
                <h3 className="text-white font-bold text-base mb-1">{member.name}</h3>
                <p className="text-[var(--gold)] text-xs font-semibold mb-1">{member.role}</p>
                <p className="text-white/40 text-[11px] mb-3">{member.exp} experience</p>
                <p className="text-white/55 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[var(--dark)] py-16 border-t border-white/8">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Our Journey</p>
            <h2 className="text-3xl font-bold text-white">Key Milestones</h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6 relative">
                {/* Line */}
                {i < milestones.length - 1 && (
                  <div className="absolute left-[27px] top-10 bottom-0 w-0.5 bg-white/10" />
                )}
                <div className="w-14 h-14 rounded-full border-2 border-[var(--gold)]/50 bg-[var(--gold)]/8 flex items-center justify-center shrink-0 z-10">
                  <span className="text-[var(--gold)] font-bold text-[11px]">{m.year}</span>
                </div>
                <div className="pb-8 pt-3 flex-1">
                  <p className="text-white/75 text-sm leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--gold)] py-14">
        <div className="max-w-[1320px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-black mb-3">Ready to Start Your Adventure?</h2>
          <p className="text-black/65 text-sm mb-8 max-w-md mx-auto">
            Join thousands of travellers who have trusted Impelisa to create the journey of a lifetime.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-black text-white font-bold px-8 py-3.5 rounded-full hover:bg-[var(--dark-2)] transition-colors"
          >
            Plan Your Trip
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
