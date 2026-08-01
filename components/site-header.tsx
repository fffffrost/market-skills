import Link from "next/link";
import { LanguageSwitch } from "@/components/language-switch";
import { localizedPath, type Locale } from "@/lib/site-content";

const copy = {
  en: {
    navigation: [
      { href: "/skills", label: "Skills" },
      { href: "/cases", label: "Cases" },
      { href: "/install", label: "Install" },
      { href: "/#principles", label: "Standards" },
    ],
    home: "MARKET SKILLS home",
    nav: "Primary navigation",
    status: "System online",
  },
  zh: {
    navigation: [
      { href: "/skills", label: "技能库" },
      { href: "/cases", label: "案例" },
      { href: "/install", label: "安装" },
      { href: "/#principles", label: "标准" },
    ],
    home: "MARKET SKILLS 首页",
    nav: "主导航",
    status: "系统在线",
  },
} as const;

export function SiteHeader({ locale }: { locale: Locale }) {
  const content = copy[locale];
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href={localizedPath(locale)} aria-label={content.home}>
          <span>MARKET</span>
          <span className="brand-slash">{"//"}</span>
          <span>SKILLS</span>
        </Link>
        <nav className="main-nav" aria-label={content.nav}>
          {content.navigation.map((item) => (
            <Link href={localizedPath(locale, item.href)} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <LanguageSwitch locale={locale} />
        <div className="system-status" aria-label={content.status}>
          <span className="status-dot" aria-hidden="true" />
          SYS.ONLINE
        </div>
      </div>
    </header>
  );
}
