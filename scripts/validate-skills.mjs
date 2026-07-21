import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import { z } from "zod";

const root = path.join(process.cwd(), "skills");
const validPhases = ["insight", "strategy", "content", "execution", "review"];

const listingSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(2),
  english_name: z.string().min(2),
  summary: z.string().min(20),
  phase: z.enum(validPhases),
  phase_label: z.string().min(2),
  roles: z.array(z.string()).min(1),
  tasks: z.array(z.string()).min(1),
  inputs: z.array(z.string()).min(1),
  outputs: z.array(z.string()).min(1),
  compatibility: z.array(z.string()).min(1),
  dependencies: z.array(z.string()).min(1),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  updated_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  featured: z.boolean(),
  order: z.number().int().positive(),
  example_prompt: z.string().min(12),
});

const errors = [];
const orders = new Set();
const directories = fs.existsSync(root)
  ? fs.readdirSync(root, { withFileTypes: true }).filter((entry) => entry.isDirectory())
  : [];
const casePath = path.join(process.cwd(), "tests", "skill-cases.yaml");
const skillCases = fs.existsSync(casePath) ? parse(fs.readFileSync(casePath, "utf8")) : [];

for (const directory of directories) {
  const skillRoot = path.join(root, directory.name);
  const skillPath = path.join(skillRoot, "SKILL.md");
  const listingPath = path.join(skillRoot, "listing.yaml");
  const agentPath = path.join(skillRoot, "agents", "openai.yaml");

  for (const requiredPath of [skillPath, listingPath, agentPath]) {
    if (!fs.existsSync(requiredPath)) errors.push(`${directory.name}: 缺少 ${path.relative(skillRoot, requiredPath)}`);
  }
  if (!fs.existsSync(skillPath) || !fs.existsSync(listingPath)) continue;

  const markdown = fs.readFileSync(skillPath, "utf8");
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    errors.push(`${directory.name}: SKILL.md frontmatter 无效`);
    continue;
  }

  const frontmatter = parse(match[1]);
  const frontmatterKeys = Object.keys(frontmatter ?? {});
  if (frontmatterKeys.some((key) => !["name", "description"].includes(key))) {
    errors.push(`${directory.name}: frontmatter 仅允许 name 和 description`);
  }
  if (frontmatter?.name !== directory.name) errors.push(`${directory.name}: frontmatter name 与目录名不一致`);
  if (typeof frontmatter?.description !== "string" || frontmatter.description.length < 40) {
    errors.push(`${directory.name}: description 过短或缺失`);
  }
  if (/\[TODO|TODO:/i.test(markdown)) errors.push(`${directory.name}: 仍包含 TODO`);
  if (markdown.split("\n").length > 500) errors.push(`${directory.name}: SKILL.md 超过 500 行`);
  if (!/Version 1\.0\.0, MIT License\./.test(markdown)) {
    errors.push(`${directory.name}: 缺少版本或 MIT 授权说明`);
  }

  let listing;
  try {
    listing = listingSchema.parse(parse(fs.readFileSync(listingPath, "utf8")));
  } catch (error) {
    errors.push(`${directory.name}: listing.yaml 无效 — ${error.message}`);
    continue;
  }

  if (listing.slug !== directory.name) errors.push(`${directory.name}: listing slug 与目录名不一致`);
  if (orders.has(listing.order)) errors.push(`${directory.name}: order ${listing.order} 重复`);
  orders.add(listing.order);

  const references = [...markdown.matchAll(/\((references\/[^)]+)\)/g)].map((match) => match[1]);
  for (const reference of references) {
    if (!fs.existsSync(path.join(skillRoot, reference))) errors.push(`${directory.name}: 引用文件不存在 ${reference}`);
  }

  if (fs.existsSync(agentPath)) {
    const agent = parse(fs.readFileSync(agentPath, "utf8"));
    const prompt = agent?.interface?.default_prompt;
    if (typeof prompt !== "string" || !prompt.includes(`$${directory.name}`)) {
      errors.push(`${directory.name}: openai.yaml default_prompt 必须引用 $${directory.name}`);
    }
  }
}

if (directories.length !== 10) errors.push(`期望 10 个 Skill，实际 ${directories.length} 个`);

const caseSchema = z.array(z.object({
  slug: z.string(),
  positive: z.string().min(12),
  negative: z.string().min(12),
}));

try {
  const parsedCases = caseSchema.parse(skillCases);
  const caseSlugs = new Set(parsedCases.map((item) => item.slug));
  for (const directory of directories) {
    if (!caseSlugs.has(directory.name)) errors.push(`${directory.name}: 缺少正向或负向验收场景`);
  }
  if (parsedCases.length !== directories.length) errors.push("Skill 验收场景数量与目录数量不一致");
} catch (error) {
  errors.push(`tests/skill-cases.yaml 无效 — ${error.message}`);
}

if (errors.length) {
  console.error("Skill 校验失败：\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log(`✓ 已校验 ${directories.length} 个 Skill：结构、元数据、引用、授权和验收场景均有效。`);
