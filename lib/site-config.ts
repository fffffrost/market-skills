const fallbackRepo = "github-owner/market-skills";
const fallbackSiteUrl = "http://localhost:3000";

const githubRepo = process.env.NEXT_PUBLIC_GITHUB_REPO || fallbackRepo;
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl).replace(/\/+$/, "");
const isRepoConfigured = githubRepo !== fallbackRepo;
const isSiteConfigured = siteUrl !== fallbackSiteUrl;

if (process.env.NODE_ENV === "production" && (!isRepoConfigured || !isSiteConfigured)) {
  throw new Error("生产部署前必须配置真实的 NEXT_PUBLIC_GITHUB_REPO 与 NEXT_PUBLIC_SITE_URL。");
}

export const siteConfig = {
  name: "MARKET//SKILLS",
  title: "MARKET//SKILLS - 市场人的 AI Skill Hub",
  description: "为市场人提炼的可安装 AI Agent Skills：从洞察、策略、内容到执行与复盘。",
  keywords: [
    "Agent Skills",
    "市场营销",
    "AI 营销",
    "Codex Skills",
    "中文 Skill",
  ],
  locales: {
    en: {
      title: "MARKET//SKILLS - China Marketing Skills for AI Agents",
      description:
        "Open-source, evidence-based AI agent skills for global teams researching, localizing, launching, and learning in China.",
      keywords: ["China marketing", "China market entry", "WeChat marketing", "Baidu SEO"],
    },
    zh: {
      title: "MARKET//SKILLS - 市场人的 AI Skill Hub",
      description:
        "为市场人提炼的可安装 AI Agent Skills：从洞察、策略、内容到执行与复盘。",
      keywords: ["Agent Skills", "市场营销", "AI 营销", "Codex Skills", "中文 Skill"],
    },
  },
  githubRepo,
  githubUrl: "https://github.com/" + githubRepo,
  siteUrl,
  isRepoConfigured,
  isSiteConfigured,
} as const;

export function absoluteUrl(pathname: string) {
  const url = new URL(pathname, siteUrl + "/");
  if (url.pathname !== "/" && !url.pathname.endsWith("/")) url.pathname += "/";
  return url.toString();
}

export function getInstallCommand(slug?: string) {
  const base = `npx skills add ${siteConfig.githubRepo}`;
  return slug ? `${base} --skill ${slug}` : base;
}
