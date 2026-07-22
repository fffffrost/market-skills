import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, expect, it } from "vitest";
import { SkillExplorer } from "@/components/skill-explorer";
import type { SkillListing } from "@/lib/skill-schema";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
}));

const base: Omit<SkillListing, "slug" | "title" | "english_name" | "summary" | "phase" | "phase_label" | "roles" | "tasks" | "inputs" | "outputs" | "order" | "example_prompt"> = {
  protocol_steps: ["准备材料", "执行分析", "整理交付"],
  compatibility: ["Codex"],
  dependencies: ["无"],
  version: "1.0.0",
  updated_at: "2026-07-21",
  featured: true,
};

const skills: SkillListing[] = [
  {
    ...base,
    slug: "research-competitors",
    title: "竞品研究",
    english_name: "Research Competitors",
    summary: "发现并比较真正影响市场决策的竞品对象和替代方案。",
    phase: "insight",
    phase_label: "洞察",
    roles: ["产品市场"],
    tasks: ["竞品调研"],
    inputs: ["产品资料"],
    outputs: ["竞品地图"],
    order: 1,
    example_prompt: "调研这个市场的竞争格局。",
  },
  {
    ...base,
    slug: "campaign-retrospective",
    title: "Campaign 复盘",
    english_name: "Campaign Retrospective",
    summary: "从目标、数据和执行证据中形成可以行动的复盘结论。",
    phase: "review",
    phase_label: "复盘",
    roles: ["增长"],
    tasks: ["效果分析"],
    inputs: ["渠道数据"],
    outputs: ["行动清单"],
    order: 2,
    example_prompt: "复盘这次 Campaign 的结果。",
  },
];

describe("SkillExplorer", () => {
  it("searches in Chinese task content and can reset", async () => {
    render(<SkillExplorer skills={skills} />);
    const search = screen.getByRole("searchbox");

    await userEvent.type(search, "竞品");
    expect(screen.getByRole("heading", { name: "竞品研究" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Campaign 复盘" })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "清空筛选 ×" }));
    expect(screen.getByRole("heading", { name: "Campaign 复盘" })).toBeInTheDocument();
  });

  it("combines phase and role filters and shows the empty state", async () => {
    render(<SkillExplorer skills={skills} />);
    const selects = screen.getAllByRole("combobox");
    await userEvent.selectOptions(selects[0], "review");
    await userEvent.selectOptions(selects[1], "产品市场");

    const empty = screen.getByText("暂时没有匹配的 Skill").parentElement;
    expect(empty).not.toBeNull();
    expect(within(empty as HTMLElement).getByRole("button", { name: "重置检索" })).toBeInTheDocument();
  });
});
