import type { Metadata } from "next";
import { SkillDetailPage } from "@/components/pages/skill-detail-page";
import { SiteFrame } from "@/components/site-frame";
import { chinaCompetitorTemplate } from "@/lib/china-competitor-template";
import { createPageMetadata } from "@/lib/seo";
import { getSeoChecklistPage } from "@/lib/seo-checklist-pages";
import { getSkill, getSkills } from "@/lib/skills";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return getSkills("en").map((skill) => ({ slug: skill.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const skill = getSkill(slug, "en"); if (!skill) return {};
  const isChinaCompetitorTemplate = skill.slug === "research-competitors";
  const checklistPage = getSeoChecklistPage(skill.slug);
  return createPageMetadata({
    title: isChinaCompetitorTemplate ? chinaCompetitorTemplate.seoTitle : checklistPage?.seoTitle ?? `${skill.title} AI Skill`,
    description: isChinaCompetitorTemplate ? chinaCompetitorTemplate.seoDescription : checklistPage?.seoDescription ?? skill.summary,
    path: `/skills/${skill.slug}/`,
    locale: "en",
    keywords: isChinaCompetitorTemplate
      ? [...chinaCompetitorTemplate.keywords, skill.english_name, ...skill.tasks, ...skill.roles]
      : checklistPage
        ? [...checklistPage.keywords, skill.english_name, ...skill.tasks, ...skill.roles]
        : [skill.english_name, ...skill.tasks, ...skill.roles],
  });
}
export default async function Page({ params }: Props) { const { slug } = await params; return <SiteFrame locale="en"><SkillDetailPage slug={slug} locale="en" /></SiteFrame>; }
