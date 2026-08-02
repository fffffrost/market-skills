import type { MetadataRoute } from "next";
import { getCases } from "@/lib/cases";
import { absoluteUrl } from "@/lib/site-config";
import { localizedPath, type Locale } from "@/lib/site-content";
import { getSkills } from "@/lib/skills";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales: Locale[] = ["zh", "en"];
  const staticRoutes = locales.flatMap((locale) => ["/", "/skills/", "/cases/", "/install/", "/feedback/"].map((route) => ({
    url: absoluteUrl(localizedPath(locale, route)),
    lastModified: new Date("2026-08-02"),
  })));
  const skillRoutes = locales.flatMap((locale) => getSkills(locale).map((skill) => ({
    url: absoluteUrl(localizedPath(locale, `/skills/${skill.slug}/`)),
    lastModified: new Date(skill.updated_at),
  })));
  const caseRoutes = locales.flatMap((locale) => getCases(locale).map((caseStudy) => ({
    url: absoluteUrl(localizedPath(locale, `/cases/${caseStudy.slug}/`)),
    lastModified: new Date(caseStudy.published_at),
  })));
  return [...staticRoutes, ...skillRoutes, ...caseRoutes];
}
