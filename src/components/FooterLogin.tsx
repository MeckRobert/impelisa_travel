"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FooterLogin() {
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
      className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60 transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
    >
      Login
    </Link>
  );
}
