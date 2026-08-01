import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { getCase } from "@/lib/cases";
import { absoluteUrl } from "@/lib/site-config";
import { localeConfig, localizedPath, type Locale } from "@/lib/site-content";
import { getSkill } from "@/lib/skills";

const copy = {
  en: {
    cases: "Field cases", breadcrumb: "Breadcrumb", docket: "Case docket", role: "ROLE", work: "WORK TYPE", primary: "PRIMARY SKILL", published: "PUBLISHED",
    disclosure: "This article uses a fictional scenario and synthetic material to demonstrate a workflow. It does not represent a real client, company, project, or market result.",
    qCode: "01 / DECISION BEFORE OUTPUT", qLabel: "Decision to support", inputCode: "02 / INPUT FILE", inputTitle: "Put source material and constraints on the table.",
    minimum: "MINIMUM INPUT", prompt: "STARTING PROMPT", processCode: "03 / EXECUTION TRACE", processTitle: "Preserve the work trace, not only the answer.",
    outputCode: "04 / OUTPUT EXCERPT", outputTitle: "The deliverable should make judgment visible.", delivered: "DELIVERED / COMPLETE PACKAGE",
    judgment: "05 / HUMAN CHECKPOINTS", judgmentTitle: "These decisions do not belong to a template.", good: "GOOD FIT", poor: "NOT FOR THIS",
    takeaway: "FIELD NOTE / CORE TAKEAWAY", reproduce: "REPRODUCE THE METHOD", cta: (title: string) => `Reproduce the method with ${title}.`,
    ctaBody: "The case demonstrates a reusable operating structure. Bring your own source material, constraints, and decision criteria to a real task.",
    skill: "View skill details ↗", install: "Install guide →", back: "← Back to field cases", all: "Browse all skills →",
  },
  zh: {
    cases: "实战案例", breadcrumb: "面包屑", docket: "案例档案", role: "ROLE", work: "WORK TYPE", primary: "PRIMARY SKILL", published: "PUBLISHED",
    disclosure: "本文使用虚构场景与合成材料展示工作方法，不对应任何真实客户、公司、项目或市场结果。",
    qCode: "01 / DECISION BEFORE OUTPUT", qLabel: "真正要支持的决策", inputCode: "02 / INPUT FILE", inputTitle: "先把材料与约束摆上桌面。",
    minimum: "MINIMUM INPUT / 最低输入", prompt: "STARTING PROMPT / 起始指令", processCode: "03 / EXECUTION TRACE", processTitle: "保留工作轨迹，而不只展示答案。",
    outputCode: "04 / OUTPUT EXCERPT", outputTitle: "交付物应该让判断可见。", delivered: "DELIVERED / 完整交付",
    judgment: "05 / HUMAN CHECKPOINTS", judgmentTitle: "这些判断不能交给模板。", good: "GOOD FIT", poor: "NOT FOR THIS",
    takeaway: "FIELD NOTE / 核心结论", reproduce: "REPRODUCE THE METHOD", cta: (title: string) => `用「${title}」复现这套方法。`,
    ctaBody: "案例展示的是一种可复现的工作结构。换成真实任务时，请提供自己的材料、约束和判断标准。",
    skill: "查看 Skill 详情 ↗", install: "查看安装指南 →", back: "← 返回案例库", all: "浏览全部 Skill →",
  },
} as const;

export function CaseDetailPage({ slug, locale }: { slug: string; locale: Locale }) {
  const content = copy[locale];
  const caseStudy = getCase(slug, locale);
  if (!caseStudy) notFound();
  const skill = getSkill(caseStudy.skill_slug, locale);
  if (!skill) throw new Error(`Case references missing skill: ${caseStudy.skill_slug}`);
  const casePath = localizedPath(locale, `/cases/${caseStudy.slug}/`);
  const caseUrl = absoluteUrl(casePath);
  const caseJsonLd = {
    "@context": "https://schema.org", "@graph": [
      {
        "@type": "Article", "@id": absoluteUrl(casePath + "#article"), headline: caseStudy.title,
        alternativeHeadline: caseStudy.english_name, description: caseStudy.summary, url: caseUrl, mainEntityOfPage: caseUrl,
        datePublished: caseStudy.published_at, dateModified: caseStudy.published_at, inLanguage: localeConfig[locale].languageTag,
        articleSection: caseStudy.phase_label, keywords: caseStudy.keywords, isAccessibleForFree: true,
        author: { "@type": "Organization", name: "MARKET//SKILLS" }, publisher: { "@type": "Organization", name: "MARKET//SKILLS" },
        about: { "@type": "SoftwareSourceCode", name: skill.title, url: absoluteUrl(localizedPath(locale, `/skills/${skill.slug}/`)) },
      },
      {
        "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "en" ? "Home" : "首页", item: absoluteUrl(localizedPath(locale)) },
          { "@type": "ListItem", position: 2, name: content.cases, item: absoluteUrl(localizedPath(locale, "/cases/")) },
          { "@type": "ListItem", position: 3, name: caseStudy.title, item: caseUrl },
        ],
      },
    ],
  };
  return (
    <article className={`case-detail phase-${caseStudy.phase}`}>
      <JsonLd data={caseJsonLd} />
      <div className="shell">
        <nav className="breadcrumbs" aria-label={content.breadcrumb}><Link href={localizedPath(locale, "/cases")}>{content.cases}</Link><span>/</span><span>CASE.{String(caseStudy.order).padStart(2, "0")}</span></nav>
        <header className="case-hero">
          <div className="case-title-block"><div className="eyebrow"><span>CASE.{String(caseStudy.order).padStart(2, "0")}</span> / {caseStudy.phase_label} / SYNTHETIC</div><h1>{caseStudy.title}</h1>{locale === "zh" && <p className="case-english">{caseStudy.english_name}</p>}<p className="case-summary">{caseStudy.summary}</p></div>
          <aside className="case-docket" aria-label={content.docket}><span>CASE DOCKET</span><dl><div><dt>{content.role}</dt><dd>{caseStudy.role}</dd></div><div><dt>{content.work}</dt><dd>{caseStudy.work_type}</dd></div><div><dt>{content.primary}</dt><dd>{skill.title}</dd></div><div><dt>{content.published}</dt><dd>{caseStudy.published_at}</dd></div></dl></aside>
        </header>
        <div className="case-disclosure"><span>DATA DISCLOSURE</span><p>{content.disclosure}</p></div>
        <section className="case-question" aria-labelledby={`case-question-${locale}`}><span className="panel-kicker">{content.qCode}</span><div><h2 id={`case-question-${locale}`}>{caseStudy.task}</h2><blockquote><span>{content.qLabel}</span><p>{caseStudy.decision}</p></blockquote></div></section>
        <section className="case-brief" aria-labelledby={`case-brief-${locale}`}>
          <div className="case-section-heading"><span className="panel-kicker">{content.inputCode}</span><h2 id={`case-brief-${locale}`}>{content.inputTitle}</h2></div>
          <div className="case-context-grid">{caseStudy.context.map((item) => <div key={item.label}><span>{item.label}</span><p>{item.value}</p></div>)}</div>
          <div className="case-input-grid"><div><span className="case-subhead">{content.minimum}</span><ul>{caseStudy.inputs.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="case-prompt"><span className="case-subhead">{content.prompt}</span><code>Use ${skill.slug}</code><p>{caseStudy.prompt}</p></div></div>
        </section>
        <section className="case-process" aria-labelledby={`case-process-${locale}`}><div className="case-section-heading"><span className="panel-kicker">{content.processCode}</span><h2 id={`case-process-${locale}`}>{content.processTitle}</h2></div><ol>{caseStudy.steps.map((step, index) => <li key={step.title}><span className="case-step-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.body}</p><aside><span>CHECKPOINT</span>{step.checkpoint}</aside></div></li>)}</ol></section>
        <section className="case-output" aria-labelledby={`case-output-${locale}`}><div className="case-section-heading"><span className="panel-kicker">{content.outputCode}</span><h2 id={`case-output-${locale}`}>{content.outputTitle}</h2></div><div className="case-artifact-grid">{caseStudy.artifacts.map((artifact) => <article key={artifact.label}><span>{artifact.label}</span><h3>{artifact.title}</h3><p>{artifact.body}</p></article>)}</div><div className="case-deliverables"><span className="case-subhead">{content.delivered}</span><ul>{caseStudy.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
        <section className="case-judgment-grid" aria-label={locale === "en" ? "Human judgment and boundaries" : "人工判断与适用边界"}><div className="case-human-checks"><span className="panel-kicker">{content.judgment}</span><h2>{content.judgmentTitle}</h2><ul>{caseStudy.human_checks.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="case-boundaries"><div><span>{content.good}</span><ul>{caseStudy.good_fit.map((item) => <li key={item}>{item}</li>)}</ul></div><div><span>{content.poor}</span><ul>{caseStudy.poor_fit.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>
        <section className="case-takeaway"><span>{content.takeaway}</span><p>{caseStudy.takeaway}</p></section>
        <section className="case-skill-cta"><div><span className="section-code">{content.reproduce}</span><h2>{content.cta(skill.title)}</h2><p>{content.ctaBody}</p></div><div><Link className="primary-link" href={localizedPath(locale, `/skills/${skill.slug}`)}>{content.skill}</Link><Link className="text-link" href={localizedPath(locale, "/install")}>{content.install}</Link></div></section>
        <nav className="detail-end-nav"><Link href={localizedPath(locale, "/cases")}>{content.back}</Link><Link href={localizedPath(locale, "/skills")}>{content.all}</Link></nav>
      </div>
    </article>
  );
}
