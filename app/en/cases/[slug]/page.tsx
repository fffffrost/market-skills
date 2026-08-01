import type { Metadata } from "next";
import { CaseDetailPage } from "@/components/pages/case-detail-page";
import { SiteFrame } from "@/components/site-frame";
import { getCase, getCases } from "@/lib/cases";
import { createPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return getCases("en").map((item) => ({ slug: item.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const item = getCase(slug, "en"); if (!item) return {}; return createPageMetadata({ title: `${item.title} | AI Skill Case`, description: item.summary, path: `/cases/${item.slug}/`, locale: "en", keywords: item.keywords, article: { publishedTime: item.published_at } }); }
export default async function Page({ params }: Props) { const { slug } = await params; return <SiteFrame locale="en"><CaseDetailPage slug={slug} locale="en" /></SiteFrame>; }
