import Image from "next/image";
import Link from "next/link";
import FooterLogin from "@/components/FooterLogin";

const footerLinks = {
  Destinations: [
    "Serengeti National Park",
    "Ngorongoro Crater",
    "Zanzibar",
    "Mount Kilimanjaro",
    "Mikumi National Park",
    "Lake Manyara",
  ],
  "Safari Packages": [
    "Classic Safaris",
    "Luxury Safaris",
    "Family Safaris",
    "Photography Safaris",
    "Beach & Safari",
    "Custom Packages",
  ],
  Company: [
    "About Us",
    "Our Story",
    "Meet the Team",
    "Sustainability",
    "Blog",
    "Contact",
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/8">
      {/* Main footer */}
      <div className="max-w-[1320px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 relative">
                <Image
                  src="/images/logo.png"
                  alt="Impelisa Travel & Tours Africa"
                  fill
                  className="object-contain rounded-xl"
                />
              </div>
              <div>
                <div className="text-[var(--gold)] font-bold text-lg tracking-wide uppercase">
                  IMPELISA
                </div>
                <div className="text-white/50 text-[0.65rem] tracking-widest uppercase">
                  Travel &amp; Tours Ltd
                </div>
              </div>
            </Link>

            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Tanzanian-based travel company specializing in safari adventures, beach holidays,
              cultural experiences and tailor-made tours across East Africa.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <a href="tel:+255673332743" className="flex items-center gap-3 text-white/60 hover:text-[var(--gold)] transition-colors text-sm">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.85 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +255 673 332 743
              </a>
              <a href="mailto:info@impelisa.co.tz" className="flex items-center gap-3 text-white/60 hover:text-[var(--gold)] transition-colors text-sm">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                info@impelisa.co.tz
              </a>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Dar es Salaam, Tanzania
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {["facebook", "instagram", "twitter", "youtube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-200"
                  aria-label={social}
                >
                  {social === "facebook" && (
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  )}
                  {social === "instagram" && (
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  )}
                  {social === "twitter" && (
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                    </svg>
                  )}
                  {social === "youtube" && (
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                      <polygon fill="#000" points="9.75,15.02 15.5,11.75 9.75,8.48 9.75,15.02"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-white/50 hover:text-[var(--gold)] text-sm transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 py-5 px-6">
        <div className="max-w-[1320px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-xs">
            © 2026 Impelisa Travel &amp; Tours Africa. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/35 text-xs tracking-widest uppercase">
              Explore · Discover · Experience
            </span>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-white/35 hover:text-white/60 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/35 hover:text-white/60 text-xs transition-colors">
              Terms of Service
            </Link>
            <FooterLogin />
          </div>
        </div>
      </div>
    </footer>
  );
}
