import type { Metadata } from "next";
import { InstallPage, installPageCopy } from "@/components/pages/install-page";
import { SiteFrame } from "@/components/site-frame";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: installPageCopy.zh.title, description: installPageCopy.zh.description, path: "/install/", locale: "zh" });
export default function Page() { return <SiteFrame locale="zh"><InstallPage locale="zh" /></SiteFrame>; }
