import { expect, test } from "@playwright/test";

test("home exposes the complete workflow and install path", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /别从空白/ })).toBeVisible();
  await expect(page.getByText(/为市场人量身打造的 AI Skill Hub/)).toBeVisible();
  await expect(page.getByText("10", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "竞品研究" })).toBeVisible();
  await expect(page.getByText(/npx skills add [\w-]+\/market-skills/).first()).toBeVisible();
});

test("query links filter the static skill directory", async ({ page }) => {
  await page.goto("/skills?q=公众号");
  await expect(page.getByRole("heading", { name: "公众号长文编辑" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "竞品研究" })).toHaveCount(0);
  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  expect(canonical).not.toBeNull();
  expect(new URL(canonical!).pathname).toBe("/skills/");
  expect(new URL(canonical!).search).toBe("");
});

test("skill detail contains inputs, outputs and an install command", async ({ page }) => {
  await page.goto("/skills/research-competitors");
  await expect(page.getByRole("heading", { name: "竞品研究" })).toBeVisible();
  await expect(page.getByText("INPUT / 所需材料")).toBeVisible();
  await expect(page.getByText("OUTPUT / 交付结果")).toBeVisible();
  await expect(page.getByText("EXECUTION PROTOCOL / 执行流程")).toBeVisible();
  await expect(page.locator(".protocol-panel li").first()).toContainText("确定研究深度");
  await expect(page.getByText(/--skill research-competitors/)).toBeVisible();
});

test("mobile layout does not create horizontal page overflow", async ({ page }) => {
  await page.goto("/");
  const sizes = await page.evaluate(() => ({ width: window.innerWidth, scroll: document.documentElement.scrollWidth }));
  expect(sizes.scroll).toBeLessThanOrEqual(sizes.width + 1);
});

test("primary body copy keeps a readable type size", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".section-heading > p").first()).toHaveCSS("font-size", "17px");
  await expect(page.locator(".skill-summary").first()).toHaveCSS("font-size", "16px");
  await expect(page.locator(".panel-topline")).toHaveCSS("font-size", "11px");
  await expect(page.locator(".radar-field small")).toHaveCSS("font-size", "11px");
  await expect(page.locator(".system-readout span").first()).toHaveCSS("font-size", "10px");
  await expect(page.locator(".system-readout strong").first()).toHaveCSS("font-size", "13px");
  await expect(page.locator(".boot-log")).toHaveCSS("font-size", "10px");
  await expect(page.locator(".radar-field strong")).toHaveCSS("animation-name", "radar-core-boot");
  await expect(page.locator(".radar-node.node-1")).toHaveCSS("animation-name", "radar-node-ping");

  await page.goto("/skills/research-competitors");
  await expect(page.locator(".detail-summary")).toHaveCSS(
    "font-size",
    page.viewportSize()?.width === 375 ? "17px" : "18px",
  );
  await expect(page.locator(".io-panel li").first()).toHaveCSS("font-size", "16px");
  await expect(page.locator(".prompt-example p")).toHaveCSS("font-size", "16px");
});

test("SEO metadata is page-specific and machine-readable", async ({ page, request }) => {
  await page.goto("/skills/research-competitors");
  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  expect(canonical).not.toBeNull();
  expect(new URL(canonical!).pathname).toBe("/skills/research-competitors/");

  await expect(page).toHaveTitle("竞品研究 AI Skill - MARKET//SKILLS");
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical!);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "竞品研究 AI Skill - MARKET//SKILLS",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/);
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
    "content",
    "竞品研究 AI Skill - MARKET//SKILLS",
  );
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", /twitter-image/);

  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(jsonLd.length).toBeGreaterThan(0);
  const structuredData = JSON.parse(jsonLd[0]) as { "@graph": Array<{ "@type": string }> };
  expect(structuredData["@graph"].map((item) => item["@type"])).toEqual([
    "WebPage",
    "BreadcrumbList",
    "SoftwareSourceCode",
  ]);

  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain(canonical!);
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("User-Agent: *");
});
