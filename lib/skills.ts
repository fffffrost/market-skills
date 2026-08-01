import "server-only";

import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import type { Locale } from "@/lib/site-content";
import { skillListingSchema, type SkillListing } from "@/lib/skill-schema";

export type Skill = SkillListing & {
  description: string;
  files: string[];
  body: string;
};

const skillsRoot = path.join(process.cwd(), "skills");

function parseSkillMarkdown(source: string): {
  frontmatter: { name: string; description: string };
  body: string;
} {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("SKILL.md 缺少合法 frontmatter");

  const frontmatter = parse(match[1]) as { name?: string; description?: string };
  if (!frontmatter.name || !frontmatter.description) {
    throw new Error("SKILL.md 缺少 name 或 description");
  }

  return {
    frontmatter: { name: frontmatter.name, description: frontmatter.description },
    body: match[2].trim(),
  };
}

function listFiles(directory: string, prefix = ""): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(prefix, entry.name);
    if (entry.isDirectory()) return listFiles(path.join(directory, entry.name), relative);
    return [relative.split(path.sep).join("/")];
  });
}

export function getSkills(locale: Locale = "zh"): Skill[] {
  if (!fs.existsSync(skillsRoot)) return [];

  return fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const directory = path.join(skillsRoot, entry.name);
      const listing = skillListingSchema.parse(
        parse(fs.readFileSync(path.join(directory, "listing.yaml"), "utf8")),
      );
      const markdown = parseSkillMarkdown(
        fs.readFileSync(path.join(directory, "SKILL.md"), "utf8"),
      );

      if (listing.slug !== entry.name || markdown.frontmatter.name !== entry.name) {
        throw new Error(`Skill 名称不一致: ${entry.name}`);
      }

      const { locales, ...sharedListing } = listing;

      return {
        ...sharedListing,
        ...locales[locale],
        description: markdown.frontmatter.description,
        body: markdown.body,
        files: listFiles(directory).sort(),
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getSkill(slug: string, locale: Locale = "zh") {
  return getSkills(locale).find((skill) => skill.slug === slug);
}
