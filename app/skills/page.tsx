import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/components/json-ld";
import { SkillExplorer } from "@/components/skill-explorer";
import { createPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";
import { getSkills } from "@/lib/skills";

const description = "按洞察、策略、内容、执行与复盘查找适合中文市场工作的 AI Agent Skill。";

export const metadata: Metadata = createPageMetadata({
  title: "AI Agent Skill 技能库",
  description,
  path: "/skills/",
});

export default function SkillsPage() {
  const skills = getSkills();
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl("/skills/#collection"),
    url: absoluteUrl("/skills/"),
    name: "AI Agent Skill 技能库",
    description,
    inLanguage: "zh-CN",
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: skills.length,
      itemListElement: skills.map((skill, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: skill.title,
        url: absoluteUrl("/skills/" + skill.slug + "/"),
      })),
    },
  };

  return (
    <div className="page-shell shell">
      <JsonLd data={collectionJsonLd} />
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
