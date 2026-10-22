"use client";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const services = [t.contactPage.s1, t.contactPage.s2, t.contactPage.s3, t.contactPage.s4, t.contactPage.s5, t.contactPage.s6];
  const faqs = [
    { q: t.contactPage.q1, a: t.contactPage.a1 },
    { q: t.contactPage.q2, a: t.contactPage.a2 },
    { q: t.contactPage.q3, a: t.contactPage.a3 },
    { q: t.contactPage.q4, a: t.contactPage.a4 },
  ];
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ fullName: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <main>
      <Navbar />
      <PageHero
        label={t.contactPage.label}
        title={t.contactPage.title}
        subtitle={t.contactPage.subtitle}
        imageSrc="/images/zanzibar.jpg"
        imageAlt="Zanzibar beach for contact page"
      />

      {/* Main contact section */}
      <section className="bg-[var(--bg)] py-16">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact Form – left (3 cols) */}
            <div className="lg:col-span-3">
              <div className="bg-[var(--bg-3)] rounded-2xl p-8 border border-white/8">
                <p className="section-label mb-2">{t.contactPage.send}</p>
                <h2 className="text-2xl font-bold text-white mb-6">
                  {t.contactPage.plan}
                </h2>

                {submitted && (
                  <div className="mb-6 bg-emerald-500/15 border border-emerald-500/30 rounded-xl p-4 text-emerald-400 text-sm flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {t.contactPage.sent}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-1.5">
                      {t.contactPage.name}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="input-dark text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="Enter us"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input-dark text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-1.5">
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="input-dark text-sm"
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-1.5">
                      Select a Service
                    </label>
                    <div className="relative">
                      <select
                        id="contact-service"
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="input-dark text-sm pr-8 cursor-pointer"
                      >
                        <option value="">Choose a service</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white/60 text-xs font-semibold tracking-wider uppercase mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Type your message here..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="input-dark text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold w-full justify-center text-sm py-3.5 mt-2"
                  >
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info – right (2 cols) */}
            <div className="lg:col-span-2 space-y-5">
              {/* Info card */}
              <div className="bg-[var(--bg-3)] rounded-2xl p-7 border border-white/8">
                <p className="section-label mb-4">Contact Information</p>
                <div className="space-y-5">
                  <a
                    href="tel:+255672232743"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center shrink-0 group-hover:bg-[var(--gold)]/20 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.85 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white/40 text-[11px] uppercase tracking-wider mb-0.5">Call / WhatsApp</div>
                      <div className="text-white text-sm font-medium group-hover:text-[var(--gold)] transition-colors">
                        +255 67 222 2743
                      </div>
                    </div>
                  </a>

                  <a
                    href="mailto:info@impelisa.co.tz"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center shrink-0 group-hover:bg-[var(--gold)]/20 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white/40 text-[11px] uppercase tracking-wider mb-0.5">Reply within 24 hours</div>
                      <div className="text-white text-sm font-medium group-hover:text-[var(--gold)] transition-colors">
                        info@impelisa.co.tz
                      </div>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white/40 text-[11px] uppercase tracking-wider mb-0.5">Office Location</div>
                      <div className="text-white text-sm font-medium">Dar es Salaam, Tanzania</div>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="mt-6 pt-5 border-t border-white/8">
                  <p className="text-white/40 text-[11px] uppercase tracking-wider mb-3">Follow Us</p>
                  <div className="flex gap-2">
                    {["facebook", "instagram", "twitter", "youtube"].map((social) => (
                      <a
                        key={social}
                        href="#"
                        aria-label={social}
                        className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all"
                      >
                        {social === "facebook" && (
                          <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                          </svg>
                        )}
                        {social === "instagram" && (
                          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </svg>
                        )}
                        {social === "twitter" && (
                          <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                          </svg>
                        )}
                        {social === "youtube" && (
                          <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                            <polygon fill="#000" points="9.75,15.02 15.5,11.75 9.75,8.48 9.75,15.02" />
                          </svg>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Adventure card */}
              <div className="relative rounded-2xl overflow-hidden h-44">
                <img src="/images/zanzibar.jpg" alt="Let's Plan Your Adventure" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-[var(--gold)] text-xs font-bold uppercase tracking-widest mb-1">Let&apos;s Plan Your</div>
                  <div className="text-white font-bold text-xl">Next Adventure!</div>
                </div>
              </div>

              {/* Response time */}
              <div className="bg-[var(--gold)]/8 border border-[var(--gold)]/20 rounded-xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--gold)]/15 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <div className="text-[var(--gold)] font-semibold text-sm">Average Response Time</div>
                  <div className="text-white/55 text-xs mt-0.5">We typically reply within 2–4 hours during business days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg-2)] py-16 border-t border-white/8">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Common Questions</p>
            <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="bg-[var(--bg-3)] rounded-xl border border-white/8 overflow-hidden"
              >
                <button
                  id={`faq-${i}`}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-white font-medium text-sm leading-snug">{faq.q}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth="2"
                    className={`shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-white/55 text-sm leading-relaxed border-t border-white/8 pt-4">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-white/40 text-sm">
              Still have questions?{" "}
              <Link href="mailto:info@impelisa.co.tz" className="text-[var(--gold)] font-semibold hover:underline">
                Email us directly
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
