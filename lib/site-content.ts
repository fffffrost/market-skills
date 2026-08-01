export type Locale = "en" | "zh";

export const localeConfig = {
  en: {
    languageTag: "en",
    openGraphLocale: "en_US",
    label: "English",
  },
  zh: {
    languageTag: "zh-CN",
    openGraphLocale: "zh_CN",
    label: "中文",
  },
} as const;

export function localizedPath(locale: Locale, pathname = "/") {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (locale === "zh") return normalized;
  if (normalized === "/") return "/en/";
  return `/en${normalized}`;
}

export function languageAlternates(pathname: string) {
  return {
    en: localizedPath("en", pathname),
    "zh-CN": localizedPath("zh", pathname),
    "x-default": localizedPath("zh", pathname),
  };
}
