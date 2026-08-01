import type { Metadata } from "next";
import { CaseDetailPage } from "@/components/pages/case-detail-page";
import { SiteFrame } from "@/components/site-frame";
import { getCase, getCases } from "@/lib/cases";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return getCases("zh").map((item) => ({ slug: item.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const item = getCase(slug, "zh"); if (!item) return {}; return createPageMetadata({ title: `${item.title}｜AI Skill 案例`, description: item.summary, path: `/cases/${item.slug}/`, locale: "zh", keywords: item.keywords, article: { publishedTime: item.published_at } }); }
export default async function Page({ params }: Props) { const { slug } = await params; return <SiteFrame locale="zh"><CaseDetailPage slug={slug} locale="zh" /></SiteFrame>; }
