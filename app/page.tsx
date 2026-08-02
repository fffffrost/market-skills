import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home-page";
import { SiteFrame } from "@/components/site-frame";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "市场人的 AI Skill Hub",
  description: siteConfig.locales.zh.description,
  path: "/",
  locale: "zh",
});

export default function Page() {
  return <SiteFrame locale="zh"><HomePage locale="zh" /></SiteFrame>;
}
