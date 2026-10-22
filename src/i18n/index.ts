import en, { type Dictionary } from "./en";
import zh from "./zh";
import sw from "./sw";
import fr from "./fr";

export type Locale = "en" | "zh" | "sw" | "fr";
export type { Dictionary };

export const LOCALES: { id: Locale; label: string; short: string }[] = [
  { id: "en", label: "English", short: "EN" },
  { id: "zh", label: "中文", short: "中文" },
  { id: "sw", label: "Kiswahili", short: "SW" },
  { id: "fr", label: "Français", short: "FR" },
];

export const dictionaries: Record<Locale, Dictionary> = { en, zh, sw, fr };

export const LANG_KEY = "impelisa-lang";
export const THEME_KEY = "impelisa-theme";
export const PWA_INSTALLED_KEY = "impelisa-pwa-installed";

export function htmlLang(locale: Locale) {
  if (locale === "zh") return "zh-CN";
  return locale;
}

export function interpolate(template: string, vars: Record<string, string | number>) {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, String(value)),
    template
  );
}
