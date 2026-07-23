import type { Metadata } from "next";
import { CaseCard } from "@/components/case-card";
import { JsonLd } from "@/components/json-ld";
import { getCases } from "@/lib/cases";
import { createPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";

const description =
  "查看 AI Agent Skill 在竞品研究、公众号编辑和 Campaign 复盘中的完整工作案例，包括输入、执行步骤、输出节选与人工判断点。";

export const metadata: Metadata = createPageMetadata({
  title: "AI Skill 实战案例",
  description,
  path: "/cases/",
  keywords: ["AI Skill 案例", "Agent Skill 使用方法", "市场工作案例"],
});

export default function CasesPage() {
  const cases = getCases();
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl("/cases/#collection"),
    url: absoluteUrl("/cases/"),
    name: "AI Skill 实战案例",
    description,
    inLanguage: "zh-CN",
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: cases.length,
      itemListElement: cases.map((caseStudy, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: caseStudy.title,
        url: absoluteUrl(`/cases/${caseStudy.slug}/`),
      })),
    },
  };

  return (
    <div className="cases-page shell">
      <JsonLd data={collectionJsonLd} />
      <header className="cases-header reveal reveal-1">
        <div>
          <span className="section-code">FIELD REPORTS / {String(cases.length).padStart(2, "0")} CASES</span>
          <h1>看 Skill 怎样<br /><span>进入真实工作。</span></h1>
        </div>
        <div className="cases-header-copy">
          <p>不是成功故事，也不是万能模板。每篇案例都展示一项任务如何被拆解、哪些证据能支持结论，以及哪些判断仍然必须由人完成。</p>
          <div className="synthetic-notice">
            <span>SYNTHETIC DATA</span>
            <p>首批案例均使用虚构场景与合成数据，不对应任何真实客户、公司或项目。</p>
          </div>
        </div>
      </header>

      <section className="case-index" aria-label="案例列表">
        {cases.map((caseStudy) => <CaseCard caseStudy={caseStudy} key={caseStudy.slug} />)}
      </section>

      <section className="case-method-note">
        <span className="section-code orange">READING PROTOCOL</span>
        <h2>先看决策，再看输出。</h2>
        <p>一个好案例不只展示最后写出了什么，更应该保留输入约束、证据边界、执行过程和人工检查点。你可以照着复现方法，但不应照搬合成结论。</p>
      </section>
    </div>
  );
}
