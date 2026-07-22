import fs from "node:fs";
import path from "node:path";

const outRoot = path.join(process.cwd(), "out");
const sitemap = fs.readFileSync(path.join(outRoot, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

if (sitemapUrls.length !== 13) {
  throw new Error("sitemap.xml 应包含 13 个页面，实际为 " + sitemapUrls.length);
}

const siteOrigin = new URL(sitemapUrls[0]).origin;
const skillFiles = fs
  .readdirSync(path.join(outRoot, "skills"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => ({
    file: path.join(outRoot, "skills", entry.name, "index.html"),
    route: "/skills/" + entry.name + "/",
  }));

const pages = [
  { file: path.join(outRoot, "index.html"), route: "/" },
  { file: path.join(outRoot, "skills", "index.html"), route: "/skills/" },
  { file: path.join(outRoot, "install", "index.html"), route: "/install/" },
  ...skillFiles,
];

const titles = new Set();
const descriptions = new Set();

function readTag(html, pattern, label, route) {
  const value = html.match(pattern)?.[1];
  if (!value) throw new Error(route + " 缺少 " + label);
  return value;
}

for (const page of pages) {
  const html = fs.readFileSync(page.file, "utf8");
  const canonical = siteOrigin + page.route;
  const title = readTag(html, /<title>([^<]+)<\/title>/, "title", page.route);
  const description = readTag(
    html,
    /<meta name="description" content="([^"]+)"/,
    "description",
    page.route,
  );

  if (titles.has(title)) throw new Error(page.route + " 的 title 与其他页面重复");
  if (descriptions.has(description)) throw new Error(page.route + " 的 description 与其他页面重复");
  titles.add(title);
  descriptions.add(description);

  const checks = [
    [/<link rel="canonical" href="([^"]+)"/, "canonical", canonical],
    [/<meta property="og:title" content="([^"]+)"/, "og:title"],
    [/<meta property="og:description" content="([^"]+)"/, "og:description"],
    [/<meta property="og:url" content="([^"]+)"/, "og:url", canonical],
    [/<meta property="og:image" content="([^"]+)"/, "og:image"],
    [/<meta name="twitter:title" content="([^"]+)"/, "twitter:title"],
    [/<meta name="twitter:description" content="([^"]+)"/, "twitter:description"],
    [/<meta name="twitter:image" content="([^"]+)"/, "twitter:image"],
  ];

  for (const [pattern, label, expected] of checks) {
    const value = readTag(html, pattern, label, page.route);
    if (expected && value !== expected) {
      throw new Error(page.route + " 的 " + label + " 应为 " + expected + "，实际为 " + value);
    }
  }

  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (jsonLdBlocks.length === 0) throw new Error(page.route + " 缺少 JSON-LD");
  for (const block of jsonLdBlocks) JSON.parse(block[1]);
}

for (const url of sitemapUrls) {
  if (new URL(url).pathname !== "/" && !new URL(url).pathname.endsWith("/")) {
    throw new Error("sitemap URL 缺少尾斜杠：" + url);
  }
}

console.log("SEO validation passed: " + pages.length + " pages with unique metadata, canonical URLs, social images, and JSON-LD.");
