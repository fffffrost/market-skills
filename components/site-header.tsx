import Link from "next/link";

const navigation = [
  { href: "/skills", label: "技能库" },
  { href: "/install", label: "安装" },
  { href: "/#principles", label: "标准" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="MARKET SKILLS 首页">
          <span>MARKET</span>
          <span className="brand-slash">{"//"}</span>
          <span>SKILLS</span>
        </Link>
        <nav className="main-nav" aria-label="主导航">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="system-status" aria-label="系统在线">
          <span className="status-dot" aria-hidden="true" />
          SYS.ONLINE
        </div>
      </div>
    </header>
  );
}
