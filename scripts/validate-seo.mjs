import fs from "node:fs";
import path from "node:path";

const outRoot = path.join(process.cwd(), "out");
const sitemap = fs.readFileSync(path.join(outRoot, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const siteOrigin = new URL(sitemapUrls[0]).origin;

function detailFiles(localeRoot, routeRoot, directoryName) {
  const directory = path.join(localeRoot, directoryName);
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      file: path.join(directory, entry.name, "index.html"),
      route: `${routeRoot}/${directoryName}/${entry.name}/`.replace(/\/+/g, "/"),
    }));
}

function localePages(prefix, language) {
  const localeRoot = prefix ? path.join(outRoot, prefix) : outRoot;
  const routeRoot = prefix ? `/${prefix}` : "";
  return [
    { file: path.join(localeRoot, "index.html"), route: routeRoot ? `${routeRoot}/` : "/", language },
    { file: path.join(localeRoot, "skills", "index.html"), route: `${routeRoot}/skills/`, language },
    { file: path.join(localeRoot, "cases", "index.html"), route: `${routeRoot}/cases/`, language },
    { file: path.join(localeRoot, "install", "index.html"), route: `${routeRoot}/install/`, language },
    { file: path.join(localeRoot, "feedback", "index.html"), route: `${routeRoot}/feedback/`, language },
    ...detailFiles(localeRoot, routeRoot, "skills").map((item) => ({ ...item, language })),
    ...detailFiles(localeRoot, routeRoot, "cases").map((item) => ({ ...item, language })),
  ];
}

const pages = [...localePages("", "zh-CN"), ...localePages("en", "en")];

if (sitemapUrls.length !== pages.length) {
  throw new Error(`sitemap.xml page count mismatch: expected ${pages.length}, received ${sitemapUrls.length}`);
}

const titles = new Set();
const descriptions = new Set();

function readTag(html, pattern, label, route) {
  const value = html.match(pattern)?.[1];
  if (!value) throw new Error(`${route} is missing ${label}`);
  return value;
}

function logicalRoute(route) {
  if (route === "/en/") return "/";
  return route.startsWith("/en/") ? route.slice(3) : route;
}

for (const page of pages) {
  const html = fs.readFileSync(page.file, "utf8");
  const canonical = siteOrigin + page.route;
  if (!sitemapUrls.includes(canonical)) throw new Error(`sitemap.xml is missing ${canonical}`);

  const htmlLanguage = readTag(html, /<html lang="([^"]+)"/, "html lang", page.route);
  if (htmlLanguage !== page.language) throw new Error(`${page.route} html lang should be ${page.language}, received ${htmlLanguage}`);

  const title = readTag(html, /<title>([^<]+)<\/title>/, "title", page.route);
  const description = readTag(html, /<meta name="description" content="([^"]+)"/, "description", page.route);
  if (titles.has(title)) throw new Error(`${page.route} has a duplicate title`);
  if (descriptions.has(description)) throw new Error(`${page.route} has a duplicate description`);
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
    if (expected && value !== expected) throw new Error(`${page.route} ${label} should be ${expected}, received ${value}`);
  }

  const logical = logicalRoute(page.route);
  const expectedAlternates = {
    en: siteOrigin + (logical === "/" ? "/en/" : `/en${logical}`),
    "zh-CN": siteOrigin + logical,
    "x-default": siteOrigin + logical,
  };
  for (const [language, expected] of Object.entries(expectedAlternates)) {
    const pattern = new RegExp(`<link rel="alternate" hrefLang="${language}" href="([^"]+)"`);
    const value = readTag(html, pattern, `hreflang ${language}`, page.route);
    if (value !== expected) throw new Error(`${page.route} hreflang ${language} should be ${expected}, received ${value}`);
  }

  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (jsonLdBlocks.length === 0) throw new Error(`${page.route} is missing JSON-LD`);
  for (const block of jsonLdBlocks) JSON.parse(block[1]);
}

for (const url of sitemapUrls) {
  if (new URL(url).pathname !== "/" && !new URL(url).pathname.endsWith("/")) throw new Error(`Sitemap URL is missing a trailing slash: ${url}`);
}

console.log(`SEO validation passed: ${pages.length} bilingual pages with unique metadata, canonical URLs, hreflang, social images, and JSON-LD.`);
