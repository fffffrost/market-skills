import { expect, test } from "@playwright/test";

test("home exposes the complete workflow and install path", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /别从空白/ })).toBeVisible();
  await expect(page.getByText("10", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "竞品研究" })).toBeVisible();
  await expect(page.getByText(/npx skills add github-owner\/market-skills/).first()).toBeVisible();
});

test("query links filter the static skill directory", async ({ page }) => {
  await page.goto("/skills?q=公众号");
  await expect(page.getByRole("heading", { name: "公众号长文编辑" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "竞品研究" })).toHaveCount(0);
});

test("skill detail contains inputs, outputs and an install command", async ({ page }) => {
  await page.goto("/skills/research-competitors");
  await expect(page.getByRole("heading", { name: "竞品研究" })).toBeVisible();
  await expect(page.getByText("INPUT / 所需材料")).toBeVisible();
  await expect(page.getByText("OUTPUT / 交付结果")).toBeVisible();
  await expect(page.getByText(/--skill research-competitors/)).toBeVisible();
});

test("mobile layout does not create horizontal page overflow", async ({ page }) => {
  await page.goto("/");
  const sizes = await page.evaluate(() => ({ width: window.innerWidth, scroll: document.documentElement.scrollWidth }));
  expect(sizes.scroll).toBeLessThanOrEqual(sizes.width + 1);
});
