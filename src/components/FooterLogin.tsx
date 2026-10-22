"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function FooterLogin() {
  const { t } = useLanguage();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/me")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setAuthenticated(!!data.authenticated);
      })
      .catch(() => {
        if (!cancelled) setAuthenticated(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (authenticated) return null;

  return (
    <Link
      href="/admin/login"
      className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--fg)]/60 transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
    >
      {t.footer.login}
    </Link>
  );
}
