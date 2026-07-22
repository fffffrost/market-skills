import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

type PageMetadataOptions = {
  title?: string;
  description: string;
  path: string;
  keywords?: string[];
  includeImages?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  includeImages = true,
}: PageMetadataOptions): Metadata {
  const socialTitle = title ? title + " - " + siteConfig.name : siteConfig.title;
  const canonical = absoluteUrl(path);
  const imageAlt = "MARKET//SKILLS - 市场人的 AI Skill Hub";

  return {
    ...(title ? { title } : {}),
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: { canonical },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      type: "website",
      locale: "zh_CN",
      siteName: siteConfig.name,
      ...(includeImages
        ? {
            images: [
              {
                url: siteConfig.siteUrl + "/opengraph-image",
                width: 1200,
                height: 630,
                alt: imageAlt,
                type: "image/png",
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      ...(includeImages
        ? {
            images: [
              {
                url: siteConfig.siteUrl + "/twitter-image",
                width: 1200,
                height: 630,
                alt: imageAlt,
              },
            ],
          }
        : {}),
    },
  };
}
