import type { Metadata } from "next";
import { FeedbackPage, feedbackPageCopy } from "@/components/pages/feedback-page";
import { SiteFrame } from "@/components/site-frame";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: feedbackPageCopy.en.title, description: feedbackPageCopy.en.description, path: "/feedback/", locale: "en" });
export default function Page() { return <SiteFrame locale="en"><FeedbackPage locale="en" /></SiteFrame>; }
