"use client";

import { useLanguage } from "@/context/LanguageContext";

const icons = [
  (
    <svg key="guides" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  (
    <svg key="safe" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  (
    <svg key="responsible" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  ),
  (
    <svg key="tailor" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  (
    <svg key="support" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.85 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
];

export default function FeaturesBar() {
  const { t } = useLanguage();
  const features = [
    { label: t.features.guides, sub: t.features.guidesSub },
    { label: t.features.safe, sub: t.features.safeSub },
    { label: t.features.responsible, sub: t.features.responsibleSub },
    { label: t.features.tailor, sub: t.features.tailorSub },
    { label: t.features.support, sub: t.features.supportSub },
  ];

  return (
    <section className="bg-[var(--bg-2)] border-y border-[var(--line)]">
      <div className="max-w-[1320px] mx-auto px-6 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0">
          {features.map((f, i) => (
            <div
              key={f.label}
              className={`flex flex-col items-center text-center py-5 px-4 group
                ${i < features.length - 1 ? "lg:feature-bar" : ""}
              `}
            >
              <div className="text-[var(--gold)] mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                {icons[i]}
              </div>
              <div className="text-[var(--fg)] font-semibold text-sm">{f.label}</div>
              <div className="text-[var(--fg-muted)] text-xs mt-0.5">{f.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
