import type { Metadata } from "next";
import { SkillsPage, skillsPageCopy } from "@/components/pages/skills-page";
import { SiteFrame } from "@/components/site-frame";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: skillsPageCopy.en.title, description: skillsPageCopy.en.description, path: "/skills/", locale: "en" });

export default function Page() {
  return <SiteFrame locale="en"><SkillsPage locale="en" /></SiteFrame>;
}
