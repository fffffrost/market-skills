import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-config";
import { getSkills } from "@/lib/skills";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/skills/", "/install/"].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-07-21"),
  }));
  const skillRoutes = getSkills().map((skill) => ({
    url: absoluteUrl("/skills/" + skill.slug + "/"),
    lastModified: new Date(skill.updated_at),
  }));
  return [...staticRoutes, ...skillRoutes];
}
