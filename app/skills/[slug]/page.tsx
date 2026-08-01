import type { Metadata } from "next";
import { SkillDetailPage } from "@/components/pages/skill-detail-page";
import { SiteFrame } from "@/components/site-frame";
import { createPageMetadata } from "@/lib/seo";
import { getSkill, getSkills } from "@/lib/skills";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return getSkills("zh").map((skill) => ({ slug: skill.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const skill = getSkill(slug, "zh"); if (!skill) return {};
  return createPageMetadata({ title: `${skill.title} AI Skill`, description: skill.summary, path: `/skills/${skill.slug}/`, locale: "zh", keywords: [skill.english_name, ...skill.tasks, ...skill.roles] });
}
export default async function Page({ params }: Props) { const { slug } = await params; return <SiteFrame locale="zh"><SkillDetailPage slug={slug} locale="zh" /></SiteFrame>; }
