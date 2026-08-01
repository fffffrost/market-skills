import { Suspense } from "react";
import { JsonLd } from "@/components/json-ld";
import { SkillExplorer } from "@/components/skill-explorer";
import { absoluteUrl } from "@/lib/site-config";
import { localeConfig, localizedPath, type Locale } from "@/lib/site-content";
import { getSkills } from "@/lib/skills";

export const skillsPageCopy = {
  en: {
    title: "China Marketing Skill Library",
    description: "Find installable AI agent skills for China market research, positioning, localization, WeChat content, campaign execution, and review.",
    heading: <>Find the China workflow<br />you need now.</>,
    intro: "Search by the job, not by a tool name. Filter by stage, role, and the decision or deliverable you need.",
  },
  zh: {
    title: "中国市场 AI Skill 技能库",
    description: "查找适用于中国市场研究、定位、本地化、微信内容、Campaign 执行与复盘的可安装 AI Agent Skills。",
    heading: <>找到此刻<br />该装的中国市场 Skill。</>,
    intro: "从任务出发检索，不需要先知道 Skill 名字。按阶段、岗位和工作目标组合筛选。",
  },
} as const;

export function SkillsPage({ locale }: { locale: Locale }) {
  const content = skillsPageCopy[locale];
  const skills = getSkills(locale);
  const pagePath = localizedPath(locale, "/skills/");
  const collectionJsonLd = {
    "@context": "https://schema.org", "@type": "CollectionPage", "@id": absoluteUrl(pagePath + "#collection"),
    url: absoluteUrl(pagePath), name: content.title, description: content.description,
    inLanguage: localeConfig[locale].languageTag, isPartOf: { "@id": absoluteUrl(localizedPath(locale) + "#website") },
    mainEntity: { "@type": "ItemList", numberOfItems: skills.length, itemListElement: skills.map((skill, index) => ({
      "@type": "ListItem", position: index + 1, name: skill.title, url: absoluteUrl(localizedPath(locale, `/skills/${skill.slug}/`)),
    })) },
  };

  return (
    <div className="page-shell shell">
      <JsonLd data={collectionJsonLd} />
      <header className="library-header">
        <div><span className="section-code">LIBRARY / 10 MODULES</span><h1>{content.heading}</h1></div>
        <p>{content.intro}</p>
      </header>
      <Suspense fallback={<div className="filter-loading">LOADING MODULE INDEX…</div>}>
        <SkillExplorer skills={skills} locale={locale} />
      </Suspense>
    </div>
  );
}
