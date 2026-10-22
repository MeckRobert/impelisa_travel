"use client";

import { dictionaries, htmlLang, LANG_KEY, type Dictionary, type Locale } from "@/i18n";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type LanguageContextValue = {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  t: dictionaries.en,
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANG_KEY) as Locale | null;
      if (stored && stored in dictionaries) {
        setLocaleState(stored);
        document.documentElement.lang = htmlLang(stored);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = htmlLang(next);
  }, []);

  const value = useMemo(
    () => ({ locale, t: dictionaries[locale], setLocale }),
    [locale, setLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
