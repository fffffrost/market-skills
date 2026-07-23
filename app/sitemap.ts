import type { MetadataRoute } from "next";
import { getCases } from "@/lib/cases";
import { absoluteUrl } from "@/lib/site-config";
import { getSkills } from "@/lib/skills";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/skills/", "/cases/", "/install/"].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-07-23"),
  }));
  const skillRoutes = getSkills().map((skill) => ({
    url: absoluteUrl("/skills/" + skill.slug + "/"),
    lastModified: new Date(skill.updated_at),
  }));
  const caseRoutes = getCases().map((caseStudy) => ({
    url: absoluteUrl("/cases/" + caseStudy.slug + "/"),
    lastModified: new Date(caseStudy.published_at),
  }));
  return [...staticRoutes, ...skillRoutes, ...caseRoutes];
}
