import { siteConfig } from "@/lib/site-config";

export type FeedbackKind = "install-failure" | "skill-problem" | "skill-request";

const templates: Record<FeedbackKind, string> = {
  "install-failure": "install-failure.yml",
  "skill-problem": "skill-problem.yml",
  "skill-request": "skill-request.yml",
};

export function getFeedbackUrl(kind: FeedbackKind, title?: string) {
  if (!siteConfig.isRepoConfigured) return null;

  const url = new URL(siteConfig.githubUrl + "/issues/new");
  url.searchParams.set("template", templates[kind]);
  if (title) url.searchParams.set("title", title);
  return url.toString();
}
