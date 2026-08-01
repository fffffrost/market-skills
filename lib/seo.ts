import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { languageAlternates, localeConfig, localizedPath, type Locale } from "@/lib/site-content";

type PageMetadataOptions = {
  title?: string;
  description: string;
  path: string;
  keywords?: string[];
  includeImages?: boolean;
  article?: {
    publishedTime: string;
    modifiedTime?: string;
  };
  locale?: Locale;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  includeImages = true,
  article,
  locale = "zh",
}: PageMetadataOptions): Metadata {
  const localized = localizedPath(locale, path);
  const socialTitle = title ? title + " - " + siteConfig.name : siteConfig.locales[locale].title;
  const canonical = absoluteUrl(localized);
  const imageAlt = siteConfig.locales[locale].title;

  return {
    ...(title ? { title } : {}),
    description,
    keywords: [...siteConfig.locales[locale].keywords, ...keywords],
    alternates: {
      canonical,
      languages: Object.fromEntries(
        Object.entries(languageAlternates(path)).map(([key, value]) => [key, absoluteUrl(value)]),
      ),
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      ...(article
        ? {
            type: "article" as const,
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime ?? article.publishedTime,
          }
        : { type: "website" as const }),
      locale: localeConfig[locale].openGraphLocale,
      alternateLocale: locale === "en" ? ["zh_CN"] : ["en_US"],
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
