import type { Metadata } from "next";
import { CasesPage, casesPageCopy } from "@/components/pages/cases-page";
import { SiteFrame } from "@/components/site-frame";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: casesPageCopy.en.title, description: casesPageCopy.en.description, path: "/cases/", locale: "en" });
export default function Page() { return <SiteFrame locale="en"><CasesPage locale="en" /></SiteFrame>; }
