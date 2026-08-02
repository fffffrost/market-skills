import Link from "next/link";
import { TrackedGithubLink } from "@/components/tracked-github-link";
import { siteConfig } from "@/lib/site-config";
import { localizedPath, type Locale } from "@/lib/site-content";

const copy = {
  en: {
    tagline: "Not more prompts. A more reliable way to operate in China.",
    links: ["All skills", "Field cases", "Install guide", "Feedback & privacy"],
  },
  zh: {
    tagline: "不是更多 Prompt，是更可靠的工作方法。",
    links: ["全部 Skill", "实战案例", "安装指南", "反馈与隐私"],
  },
} as const;

export function SiteFooter({ locale }: { locale: Locale }) {
  const content = copy[locale];
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="brand footer-brand">
            MARKET<span className="brand-slash">{"//"}</span>SKILLS
          </div>
          <p>{content.tagline}</p>
        </div>
        <div className="footer-links">
          <Link href={localizedPath(locale, "/skills")}>{content.links[0]}</Link>
          <Link href={localizedPath(locale, "/cases")}>{content.links[1]}</Link>
          <Link href={localizedPath(locale, "/install")}>{content.links[2]}</Link>
          <Link href={localizedPath(locale, "/feedback")}>{content.links[3]}</Link>
          {siteConfig.isRepoConfigured ? (
            <TrackedGithubLink href={siteConfig.githubUrl} target="_blank" rel="noreferrer" eventSource="footer_repository">
              GitHub ↗
            </TrackedGithubLink>
          ) : (
            <span title="连接 GitHub 仓库后开放">GitHub / 待连接</span>
          )}
        </div>
        <div className="footer-meta">
          <span>MIT LICENSE</span>
          <span>{locale === "en" ? "EN" : "ZH-CN"} / 2026</span>
        </div>
        <div className="footer-compliance">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
            赣ICP备2026013493号-2
          </a>
        </div>
      </div>
    </footer>
  );
}
