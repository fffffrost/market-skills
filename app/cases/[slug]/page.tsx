import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { getCase, getCases } from "@/lib/cases";
import { createPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";
import { getSkill } from "@/lib/skills";

type CasePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCases().map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCase(slug);
  if (!caseStudy) return {};

  return createPageMetadata({
    title: caseStudy.title + "｜AI Skill 案例",
    description: caseStudy.summary,
    path: `/cases/${caseStudy.slug}/`,
    keywords: caseStudy.keywords,
    article: { publishedTime: caseStudy.published_at },
  });
}

export default async function CaseDetailPage({ params }: CasePageProps) {
  const { slug } = await params;
  const caseStudy = getCase(slug);
  if (!caseStudy) notFound();

  const skill = getSkill(caseStudy.skill_slug);
  if (!skill) throw new Error(`案例关联了不存在的 Skill: ${caseStudy.skill_slug}`);

  const casePath = `/cases/${caseStudy.slug}/`;
  const caseUrl = absoluteUrl(casePath);
  const caseJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": absoluteUrl(casePath + "#article"),
        headline: caseStudy.title,
        alternativeHeadline: caseStudy.english_name,
        description: caseStudy.summary,
        url: caseUrl,
        mainEntityOfPage: caseUrl,
        datePublished: caseStudy.published_at,
        dateModified: caseStudy.published_at,
        inLanguage: "zh-CN",
        articleSection: caseStudy.phase_label,
        keywords: caseStudy.keywords,
        isAccessibleForFree: true,
        author: { "@type": "Organization", name: "MARKET//SKILLS" },
        publisher: { "@type": "Organization", name: "MARKET//SKILLS" },
        about: {
          "@type": "SoftwareSourceCode",
          name: skill.title,
          url: absoluteUrl(`/skills/${skill.slug}/`),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首页", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "实战案例", item: absoluteUrl("/cases/") },
          { "@type": "ListItem", position: 3, name: caseStudy.title, item: caseUrl },
        ],
      },
    ],
  };

  return (
    <article className={`case-detail phase-${caseStudy.phase}`}>
      <JsonLd data={caseJsonLd} />
      <div className="shell">
        <nav className="breadcrumbs" aria-label="面包屑">
          <Link href="/cases">实战案例</Link><span>/</span><span>CASE.{String(caseStudy.order).padStart(2, "0")}</span>
        </nav>

        <header className="case-hero">
          <div className="case-title-block">
            <div className="eyebrow">
              <span>CASE.{String(caseStudy.order).padStart(2, "0")}</span> / {caseStudy.phase_label} / SYNTHETIC
            </div>
            <h1>{caseStudy.title}</h1>
            <p className="case-english">{caseStudy.english_name}</p>
            <p className="case-summary">{caseStudy.summary}</p>
          </div>
          <aside className="case-docket" aria-label="案例档案">
            <span>CASE DOCKET</span>
            <dl>
              <div><dt>ROLE</dt><dd>{caseStudy.role}</dd></div>
              <div><dt>WORK TYPE</dt><dd>{caseStudy.work_type}</dd></div>
              <div><dt>PRIMARY SKILL</dt><dd>{skill.title}</dd></div>
              <div><dt>PUBLISHED</dt><dd>{caseStudy.published_at}</dd></div>
            </dl>
          </aside>
        </header>

        <div className="case-disclosure">
          <span>DATA DISCLOSURE</span>
          <p>本文使用虚构场景与合成材料展示工作方法，不对应任何真实客户、公司或项目，文中数字不能作为市场事实引用。</p>
        </div>

        <section className="case-question" aria-labelledby="case-question-title">
          <span className="panel-kicker">01 / DECISION BEFORE OUTPUT</span>
          <div>
            <h2 id="case-question-title">{caseStudy.task}</h2>
            <blockquote>
              <span>真正要回答的问题</span>
              <p>{caseStudy.decision}</p>
            </blockquote>
          </div>
        </section>

        <section className="case-brief" aria-labelledby="case-brief-title">
          <div className="case-section-heading">
            <span className="panel-kicker">02 / INPUT FILE</span>
            <h2 id="case-brief-title">先把材料与约束摆上桌面。</h2>
          </div>
          <div className="case-context-grid">
            {caseStudy.context.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
          <div className="case-input-grid">
            <div>
              <span className="case-subhead">MINIMUM INPUT / 最低输入</span>
              <ul>{caseStudy.inputs.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="case-prompt">
              <span className="case-subhead">STARTING PROMPT / 起始指令</span>
              <code>Use ${skill.slug}</code>
              <p>{caseStudy.prompt}</p>
            </div>
          </div>
        </section>

        <section className="case-process" aria-labelledby="case-process-title">
          <div className="case-section-heading">
            <span className="panel-kicker">03 / EXECUTION TRACE</span>
            <h2 id="case-process-title">保留工作轨迹，而不只展示答案。</h2>
          </div>
          <ol>
            {caseStudy.steps.map((step, index) => (
              <li key={step.title}>
                <span className="case-step-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <aside><span>CHECKPOINT</span>{step.checkpoint}</aside>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="case-output" aria-labelledby="case-output-title">
          <div className="case-section-heading">
            <span className="panel-kicker">04 / OUTPUT EXCERPT</span>
            <h2 id="case-output-title">交付物应该让判断可见。</h2>
          </div>
          <div className="case-artifact-grid">
            {caseStudy.artifacts.map((artifact) => (
              <article key={artifact.label}>
                <span>{artifact.label}</span>
                <h3>{artifact.title}</h3>
                <p>{artifact.body}</p>
              </article>
            ))}
          </div>
          <div className="case-deliverables">
            <span className="case-subhead">DELIVERED / 完整交付</span>
            <ul>{caseStudy.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="case-judgment-grid" aria-label="人工判断与适用边界">
          <div className="case-human-checks">
            <span className="panel-kicker">05 / HUMAN CHECKPOINTS</span>
            <h2>这些判断不能交给模板。</h2>
            <ul>{caseStudy.human_checks.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="case-boundaries">
            <div>
              <span>GOOD FIT</span>
              <ul>{caseStudy.good_fit.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <span>NOT FOR THIS</span>
              <ul>{caseStudy.poor_fit.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="case-takeaway">
          <span>FIELD NOTE / 核心结论</span>
          <p>{caseStudy.takeaway}</p>
        </section>

        <section className="case-skill-cta">
          <div>
            <span className="section-code">REPRODUCE THE METHOD</span>
            <h2>用「{skill.title}」复现这套方法。</h2>
            <p>案例展示的是一种可复现的工作结构。换成你的真实任务时，请提供自己的材料、约束和判断标准。</p>
          </div>
          <div>
            <Link className="primary-link" href={`/skills/${skill.slug}`}>查看 Skill 详情 ↗</Link>
            <Link className="text-link" href="/install">查看安装指南 →</Link>
          </div>
        </section>

        <nav className="detail-end-nav">
          <Link href="/cases">← 返回案例库</Link>
          <Link href="/skills">浏览全部 Skill →</Link>
        </nav>
      </div>
    </article>
  );
}
