import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="brand footer-brand">
            MARKET<span className="brand-slash">{"//"}</span>SKILLS
          </div>
          <p>不是更多 Prompt，是更可靠的工作方法。</p>
        </div>
        <div className="footer-links">
          <Link href="/skills">全部 Skill</Link>
          <Link href="/cases">实战案例</Link>
          <Link href="/install">安装指南</Link>
          {siteConfig.isRepoConfigured ? (
            <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
          ) : (
            <span title="连接 GitHub 仓库后开放">GitHub / 待连接</span>
          )}
        </div>
        <div className="footer-meta">
          <span>MIT LICENSE</span>
          <span>ZH-CN / 2026</span>
        </div>
      </div>
    </footer>
  );
}
