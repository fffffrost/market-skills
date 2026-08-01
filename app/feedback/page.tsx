import type { Metadata } from "next";
import { FeedbackPage, feedbackPageCopy } from "@/components/pages/feedback-page";
import { SiteFrame } from "@/components/site-frame";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: feedbackPageCopy.zh.title, description: feedbackPageCopy.zh.description, path: "/feedback/", locale: "zh" });
export default function Page() { return <SiteFrame locale="zh"><FeedbackPage locale="zh" /></SiteFrame>; }
