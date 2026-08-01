import { CaseCard } from "@/components/case-card";
import { JsonLd } from "@/components/json-ld";
import { getCases } from "@/lib/cases";
import { absoluteUrl } from "@/lib/site-config";
import { localeConfig, localizedPath, type Locale } from "@/lib/site-content";

export const casesPageCopy = {
  en: {
    title: "China Marketing AI Skill Cases",
    description: "See complete synthetic China marketing workflows with inputs, execution traces, evidence limits, outputs, and human checkpoints.",
    heading: <>See a skill enter<br /><span>a complete China job.</span></>,
    intro: "These are not success stories or universal templates. Each case shows how a decision is framed, which evidence supports it, and where local human judgment remains necessary.",
    notice: "Every first-release case uses a fictional scenario and synthetic data. It does not represent a real client, company, or market result.",
    methodTitle: "Read the decision before the output.",
    method: "A useful case preserves constraints, evidence boundaries, execution choices, and human checks. Reproduce the method with your own materials; never copy the synthetic conclusion.",
  },
  zh: {
    title: "中国市场 AI Skill 实战案例",
    description: "查看中国市场 AI Agent Skill 的完整合成案例，包括输入、执行步骤、证据边界、输出节选与人工判断点。",
    heading: <>Skill 怎样工作，<br /><span>看一次完整案例。</span></>,
    intro: "不是成功故事，也不是万能模板。每篇案例都展示一项决策如何被界定、哪些证据支持结论，以及哪些判断仍然必须由人完成。",
    notice: "首批案例均使用虚构场景与合成数据，不对应任何真实客户、公司、项目或市场结果。",
    methodTitle: "先看决策，再看输出。",
    method: "一个好案例应该保留输入约束、证据边界、执行选择和人工检查点。你可以用自己的材料复现方法，但不应照搬合成结论。",
  },
} as const;

export function CasesPage({ locale }: { locale: Locale }) {
  const content = casesPageCopy[locale];
  const cases = getCases(locale);
  const pagePath = localizedPath(locale, "/cases/");
  const collectionJsonLd = {
    "@context": "https://schema.org", "@type": "CollectionPage", "@id": absoluteUrl(pagePath + "#collection"),
    url: absoluteUrl(pagePath), name: content.title, description: content.description, inLanguage: localeConfig[locale].languageTag,
    isPartOf: { "@id": absoluteUrl(localizedPath(locale) + "#website") },
    mainEntity: { "@type": "ItemList", numberOfItems: cases.length, itemListElement: cases.map((caseStudy, index) => ({
      "@type": "ListItem", position: index + 1, name: caseStudy.title, url: absoluteUrl(localizedPath(locale, `/cases/${caseStudy.slug}/`)),
    })) },
  };
  return (
    <div className="cases-page shell">
      <JsonLd data={collectionJsonLd} />
      <header className="cases-header reveal reveal-1">
        <div><span className="section-code">FIELD REPORTS / {String(cases.length).padStart(2, "0")} CASES</span><h1>{content.heading}</h1></div>
        <div className="cases-header-copy"><p>{content.intro}</p><div className="synthetic-notice"><span>SYNTHETIC DATA</span><p>{content.notice}</p></div></div>
      </header>
      <section className="case-index" aria-label={locale === "en" ? "Case list" : "案例列表"}>{cases.map((caseStudy) => <CaseCard caseStudy={caseStudy} locale={locale} key={caseStudy.slug} />)}</section>
      <section className="case-method-note"><span className="section-code orange">READING PROTOCOL</span><h2>{content.methodTitle}</h2><p>{content.method}</p></section>
    </div>
  );
}
