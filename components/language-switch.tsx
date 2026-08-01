"use client";

import { usePathname } from "next/navigation";
import { localizedPath, type Locale } from "@/lib/site-content";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const logicalPath = locale === "en" ? pathname.replace(/^\/en(?=\/|$)/, "") || "/" : pathname;
  const otherLocale = locale === "en" ? "zh" : "en";

  return (
    <a className="language-switch" href={localizedPath(otherLocale, logicalPath)} hrefLang={otherLocale === "en" ? "en" : "zh-CN"}>
      {otherLocale === "en" ? "EN" : "中文"}
    </a>
  );
}
