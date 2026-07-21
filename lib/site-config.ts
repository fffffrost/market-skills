const fallbackRepo = "github-owner/market-skills";

const githubRepo = process.env.NEXT_PUBLIC_GITHUB_REPO || fallbackRepo;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const isRepoConfigured = githubRepo !== fallbackRepo;

if (process.env.VERCEL_ENV === "production" && !isRepoConfigured) {
  throw new Error("生产部署前必须配置 NEXT_PUBLIC_GITHUB_REPO。请使用 owner/market-skills 格式。");
}

export const siteConfig = {
  name: "MARKET//SKILLS",
  title: "MARKET//SKILLS — 市场人的 AI Skill Hub",
  description: "为中文市场工作提炼的可安装 AI Agent Skills：从洞察、策略、内容到执行与复盘。",
  githubRepo,
  githubUrl: `https://github.com/${githubRepo}`,
  siteUrl,
  isRepoConfigured,
} as const;

export function getInstallCommand(slug?: string) {
  const base = `npx skills add ${siteConfig.githubRepo}`;
  return slug ? `${base} --skill ${slug}` : base;
}

