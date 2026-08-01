import { expect, test } from "@playwright/test";

test("home exposes the complete workflow and install path", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /进入中国市场/ })).toBeVisible();
  await expect(page.getByText(/为进入和深耕中国市场的团队打造/)).toBeVisible();
  await expect(page.getByText("10", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /中国市场竞品地图/ }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /先划清竞品边界/ })).toBeVisible();
  await expect(page.getByText(/npx skills add [\w-]+\/market-skills/).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "赣ICP备2026013493号-2" })).toHaveAttribute(
    "href",
    "https://beian.miit.gov.cn/",
  );
});

test("query links filter the static skill directory", async ({ page }) => {
  await page.goto("/skills?q=公众号");
  await expect(page.getByRole("heading", { name: "公众号长文编辑" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "中国市场竞品地图" })).toHaveCount(0);
  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  expect(canonical).not.toBeNull();
  expect(new URL(canonical!).pathname).toBe("/skills/");
  expect(new URL(canonical!).search).toBe("");
});

test("empty search records only a fixed event without the search text", async ({ page }) => {
  await page.goto("/skills");
  const searchText = "尚未存在的保密任务";
  const telemetryRequest = page.waitForRequest((request) => request.url().includes("event=search_no_results"));
  await page.getByRole("searchbox").fill(searchText);
  await expect(page.getByText("暂时没有匹配的 Skill")).toBeVisible();
  const request = await telemetryRequest;
  expect(request.url()).toContain("source=skill_library");
  expect(request.url()).not.toContain(encodeURIComponent(searchText));
});

test("skill detail contains inputs, outputs and an install command", async ({ page }) => {
  await page.goto("/skills/research-competitors");
  await expect(page.getByRole("heading", { name: "中国市场竞品地图" })).toBeVisible();
  await expect(page.getByText("MINIMUM INPUT / 最低输入")).toBeVisible();
  await expect(page.getByText("OUTPUT / 交付结果")).toBeVisible();
  await expect(page.getByText("BOUNDARY / 不适合直接使用")).toBeVisible();
  await expect(page.getByText("FAILURE MODES / 常见失败原因")).toBeVisible();
  await expect(page.getByText("EXECUTION PROTOCOL / 执行流程")).toBeVisible();
  await expect(page.locator(".protocol-panel li").first()).toContainText("界定中国市场决策");
  await expect(page.getByText(/--skill research-competitors/)).toBeVisible();
  await expect(page.getByRole("link", { name: /先划清竞品边界/ })).toBeVisible();
});

test("install help and feedback paths are reachable within two clicks", async ({ page }) => {
  await page.goto("/install");
  await expect(page.getByText("TROUBLESHOOT / 安装排错")).toBeVisible();
  await expect(page.getByRole("link", { name: /报告安装问题/ })).toHaveAttribute("href", /install-failure\.yml/);

  await page.goto("/");
  await page.getByRole("link", { name: "反馈与隐私" }).click();
  await expect(page).toHaveURL(/\/feedback\/$/);
  await expect(page.getByRole("heading", { name: /让真实问题变成/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /报告安装问题/ })).toHaveAttribute("href", /install-failure\.yml/);
  await expect(page.getByRole("link", { name: /报告 Skill 问题/ })).toHaveAttribute("href", /skill-problem\.yml/);
  await expect(page.getByRole("link", { name: /提交需求信号/ })).toHaveAttribute("href", /skill-request\.yml/);
  await expect(page.getByText(/不会发送搜索词、表单内容或你的工作材料/)).toBeVisible();
});

test("copying an install command records a fixed intent event", async ({ page }) => {
  await page.goto("/install");
  const telemetryRequest = page.waitForRequest((request) => request.url().includes("event=copy_install"));
  await page.getByRole("button", { name: "复制命令" }).first().click();
  const request = await telemetryRequest;
  expect(request.url()).toContain("source=install_all_modules");
});

test("case library shows a reproducible synthetic work trace", async ({ page }) => {
  await page.goto("/cases");
  await expect(page.getByRole("heading", { name: /看 Skill 怎样/ })).toBeVisible();
  await expect(page.getByText(/首批案例均使用虚构场景与合成数据/)).toBeVisible();
  await expect(page.getByRole("link", { name: /先划清竞品边界/ })).toBeVisible();

  await page.goto("/cases/map-competitors-before-comparing");
  await expect(page.getByRole("heading", { name: "先划清竞品边界，再做对比" })).toBeVisible();
  await expect(page.getByText("DATA DISCLOSURE")).toBeVisible();
  await expect(page.getByText("真正要支持的决策")).toBeVisible();
  await expect(page.locator(".case-process li")).toHaveCount(4);
  await expect(page.locator(".case-artifact-grid article")).toHaveCount(4);
  await expect(page.getByRole("link", { name: /查看 Skill 详情/ })).toBeVisible();
});

test("Chinese and English layouts do not create horizontal page overflow", async ({ page }) => {
  for (const route of ["/", "/skills/research-competitors", "/cases", "/install", "/feedback", "/en", "/en/skills/research-competitors", "/en/cases", "/en/install", "/en/feedback"]) {
    await page.goto(route);
    const sizes = await page.evaluate(() => ({ width: window.innerWidth, scroll: document.documentElement.scrollWidth }));
    expect(sizes.scroll, route).toBeLessThanOrEqual(sizes.width + 1);
  }
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

  await expect(page).toHaveTitle("中国市场竞品地图 AI Skill - MARKET//SKILLS");
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical!);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "中国市场竞品地图 AI Skill - MARKET//SKILLS",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/);
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
    "content",
    "中国市场竞品地图 AI Skill - MARKET//SKILLS",
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

  await page.goto("/cases/map-competitors-before-comparing");
  const caseCanonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  expect(caseCanonical).not.toBeNull();
  expect(new URL(caseCanonical!).pathname).toBe("/cases/map-competitors-before-comparing/");
  await expect(page).toHaveTitle("先划清竞品边界，再做对比｜AI Skill 案例 - MARKET//SKILLS");
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");

  const caseJsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  const caseStructuredData = JSON.parse(caseJsonLd[0]) as { "@graph": Array<{ "@type": string }> };
  expect(caseStructuredData["@graph"].map((item) => item["@type"])).toEqual([
    "Article",
    "BreadcrumbList",
  ]);
  expect(await sitemap.text()).toContain(caseCanonical!);

  await page.goto("/feedback");
  const feedbackCanonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  expect(feedbackCanonical).not.toBeNull();
  expect(new URL(feedbackCanonical!).pathname).toBe("/feedback/");
  await expect(page).toHaveTitle("反馈与隐私说明 - MARKET//SKILLS");
  expect(await sitemap.text()).toContain(feedbackCanonical!);
});

test("English routes are complete, indexable, and linked to the Chinese counterpart", async ({ page, request }) => {
  await page.goto("/en/");
  await expect(page.getByRole("heading", { name: /Operate in China/ })).toBeVisible();
  await expect(page.getByText(/Installable AI agent skills for global teams/)).toBeVisible();
  await expect(page.getByRole("link", { name: /China Competitor Landscape/ }).first()).toBeVisible();

  await page.goto("/skills/research-competitors");
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/skills\/research-competitors\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: "China Competitor Landscape" })).toBeVisible();
  await expect(page.getByText("MINIMUM INPUT")).toBeVisible();
  await expect(page).toHaveTitle("China Competitor Landscape AI Skill - MARKET//SKILLS");

  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  expect(new URL(canonical!).pathname).toBe("/en/skills/research-competitors/");
  await expect(page.locator('link[rel="alternate"][hreflang="zh-CN"]')).toHaveAttribute("href", /\/skills\/research-competitors\/$/);
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", /\/en\/skills\/research-competitors\/$/);
  await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute("href", /\/skills\/research-competitors\/$/);

  await page.getByRole("link", { name: "中文", exact: true }).click();
  await expect(page).toHaveURL(/\/skills\/research-competitors\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain("/en/skills/research-competitors/");
});
