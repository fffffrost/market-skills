import type { Metadata } from "next";
import { SkillsPage, skillsPageCopy } from "@/components/pages/skills-page";
import { SiteFrame } from "@/components/site-frame";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: skillsPageCopy.zh.title, description: skillsPageCopy.zh.description, path: "/skills/", locale: "zh" });

export default function Page() {
  return <SiteFrame locale="zh"><SkillsPage locale="zh" /></SiteFrame>;
}
