import type { Metadata } from "next";
import { InstallPage, installPageCopy } from "@/components/pages/install-page";
import { SiteFrame } from "@/components/site-frame";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: installPageCopy.en.title, description: installPageCopy.en.description, path: "/install/", locale: "en" });
export default function Page() { return <SiteFrame locale="en"><InstallPage locale="en" /></SiteFrame>; }
