import type { Metadata } from "next";
import { SkillDetailPage } from "@/components/pages/skill-detail-page";
import { SiteFrame } from "@/components/site-frame";
import { createPageMetadata } from "@/lib/seo";
import { getSkill, getSkills } from "@/lib/skills";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return getSkills("en").map((skill) => ({ slug: skill.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const skill = getSkill(slug, "en"); if (!skill) return {};
  return createPageMetadata({ title: `${skill.title} AI Skill`, description: skill.summary, path: `/skills/${skill.slug}/`, locale: "en", keywords: [skill.english_name, ...skill.tasks, ...skill.roles] });
}
export default async function Page({ params }: Props) { const { slug } = await params; return <SiteFrame locale="en"><SkillDetailPage slug={slug} locale="en" /></SiteFrame>; }
