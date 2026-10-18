import Image from "next/image";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/serengeti.jpg"
          alt="Serengeti at sunset"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(ellipse at center, var(--gold) 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 text-center">
        <p className="section-label mb-4">Start Your Journey</p>
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
          Ready for Your African
          <br />
          <span className="text-[var(--gold-light)]">Adventure?</span>
        </h2>
        <p className="text-white/60 text-base max-w-lg mx-auto mb-10 leading-relaxed">
          Let our experts craft the perfect itinerary tailored to your dreams.
          Contact us today and take the first step towards an unforgettable journey.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/contact" className="btn-gold">
            Plan Your Trip Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <Link href="/safari-packages" className="btn-outline">
            Browse Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
