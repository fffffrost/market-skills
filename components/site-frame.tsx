import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/site-content";

export function SiteFrame({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <div lang={locale === "en" ? "en" : "zh-CN"}>
      <a className="skip-link" href="#main-content">
        {locale === "en" ? "Skip to main content" : "跳到主要内容"}
      </a>
      <div className="ambient-grid" aria-hidden="true" />
      <SiteHeader locale={locale} />
      <main id="main-content">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
