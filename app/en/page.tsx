import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home-page";
import { SiteFrame } from "@/components/site-frame";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "China Marketing Skills for AI Agents",
  description: siteConfig.locales.en.description,
  path: "/",
  locale: "en",
});

export default function Page() {
  return <SiteFrame locale="en"><HomePage locale="en" /></SiteFrame>;
}
