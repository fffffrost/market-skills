import type { Metadata } from "next";
import { Suspense } from "react";
import { SkillExplorer } from "@/components/skill-explorer";
import { getSkills } from "@/lib/skills";

export const metadata: Metadata = {
  title: "技能库",
  description: "按洞察、策略、内容、执行与复盘查找适合中文市场工作的 AI Agent Skill。",
};

export default function SkillsPage() {
  const skills = getSkills();

  return (
    <div className="page-shell shell">
      <header className="library-header">
        <div>
          <span className="section-code">LIBRARY / 10 MODULES</span>
          <h1>找到此刻<br />该装的 Skill。</h1>
        </div>
        <p>从任务出发检索，不需要先知道 Skill 名字。按阶段、岗位和工作目标组合筛选。</p>
      </header>
      <Suspense fallback={<div className="filter-loading">LOADING MODULE INDEX…</div>}>
        <SkillExplorer skills={skills} />
      </Suspense>
    </div>
  );
}
