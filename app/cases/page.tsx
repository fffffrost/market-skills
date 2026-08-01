import type { Metadata } from "next";
import { CasesPage, casesPageCopy } from "@/components/pages/cases-page";
import { SiteFrame } from "@/components/site-frame";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: casesPageCopy.zh.title, description: casesPageCopy.zh.description, path: "/cases/", locale: "zh" });
export default function Page() { return <SiteFrame locale="zh"><CasesPage locale="zh" /></SiteFrame>; }
