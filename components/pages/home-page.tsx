import Link from "next/link";
import { CaseCard } from "@/components/case-card";
import { InstallCommand } from "@/components/install-command";
import { JsonLd } from "@/components/json-ld";
import { SkillCard } from "@/components/skill-card";
import { getCases } from "@/lib/cases";
import { absoluteUrl, getInstallCommand, siteConfig } from "@/lib/site-config";
import { localeConfig, localizedPath, type Locale } from "@/lib/site-content";
import { getSkills } from "@/lib/skills";

const copy = {
  en: {
    eyebrow: "READY / CHINA MARKETING OPERATING SYSTEM · v2.0",
    hero: <>Operate in China.<br /><span>Start with evidence.</span></>,
    lead: "Installable AI agent skills for global teams researching, positioning, localizing, launching, and learning in China.",
    searchLabel: "What China marketing job are you trying to complete?",
    searchPlaceholder: "Try: China competitors, WeChat editing, campaign review",
    quick: [
      ["Competitors", "competitor"], ["Positioning", "positioning"], ["WeChat", "WeChat"],
      ["Localization", "localization"], ["Review", "retrospective"],
    ],
    panelLabel: "System overview",
    language: "EN + ZH",
    phaseHeading: "Work by decision stage, not by tool.",
    phaseIntro: "Each skill owns one clear job, names the evidence it needs, and shows where local judgment must take over.",
    libraryHeading: "Ten China workflows, ready to install.",
    libraryLink: "Open the complete skill library →",
    casesHeading: <>See the method<br />inside a complete job.</>,
    casesIntro: "Synthetic cases show inputs, execution traces, evidence limits, and human checkpoints.",
    casesLink: "Open field cases →",
    principlesHeading: <>China expertise should be<br />inspectable, not mystical.</>,
    principlesIntro: "Every skill turns local context, evidence standards, deliverable structure, and boundaries into a reviewable agent workflow.",
    principles: [
      ["Local context first", "Define the China buyer, platform, language, region, and decision before producing work."],
      ["Evidence over folklore", "Date time-sensitive claims and separate official facts, inference, and unknowns."],
      ["Operational output", "Inputs, workflow, owner handoffs, and acceptance criteria are explicit."],
      ["Open source", "Review every instruction, dependency, and limitation before installation."],
    ],
    installHeading: <>One install.<br />A China marketing operating layer.</>,
    installIntro: "Install the complete system or start with one workflow. Compatible with Codex, Claude Code, Cursor, and other Agent Skills hosts.",
    installLink: "Read the install guide ↗",
  },
  zh: {
    eyebrow: "READY / 中国市场任务系统 · v2.0",
    hero: <>中国市场，<br /><span>不是翻译题。</span></>,
    lead: "为进入和深耕中国市场的团队打造的 AI Skill Hub，覆盖研究、定位、本地化、执行与复盘。",
    searchLabel: "你现在要完成什么中国市场任务？",
    searchPlaceholder: "例如：中国竞品、公众号审稿、Campaign 复盘",
    quick: [
      ["竞品", "竞品"], ["定位", "定位"], ["公众号", "公众号"],
      ["本地化", "本地化"], ["复盘", "复盘"],
    ],
    panelLabel: "系统概览",
    language: "EN + ZH",
    phaseHeading: <>按决策阶段推进，<br />不按工具堆砌。</>,
    phaseIntro: "每个 Skill 对应一个清晰任务，说清需要什么证据，也说清哪些判断必须由人完成。",
    libraryHeading: <>十个工作流，<br />覆盖中国市场。</>,
    libraryLink: "打开完整技能库 →",
    casesHeading: <>方法怎么用，<br />要看一次完整工作。</>,
    casesIntro: "合成案例展示输入、执行轨迹、证据边界与人工检查点。",
    casesLink: "打开案例库 →",
    principlesHeading: <>中国市场方法，<br />要证据，不要玄学。</>,
    principlesIntro: "每个 Skill 都把本地语境、证据标准、交付结构和适用边界写进 Agent 的工作方式。",
    principles: [
      ["本地语境优先", "生产内容前先定义中国买方、平台、语言、区域和决策。"],
      ["证据优于传闻", "对时效性声明标记日期，区分官方事实、推断与未知。"],
      ["交付可执行", "输入、流程、负责人交接和验收标准都有明确结构。"],
      ["源码可查", "安装前审查全部指令、依赖和局限。"],
    ],
    installHeading: <>一次安装，<br />开始中国市场工作。</>,
    installIntro: "可安装完整系统，也可从一个工作流开始。支持 Codex、Claude Code、Cursor 与其他兼容 Agent Skills 的工具。",
    installLink: "查看安装说明 ↗",
  },
} as const;

const phases = {
  en: [
    ["insight", "01", "Insight", "See the local reality", "OBSERVE"],
    ["strategy", "02", "Strategy", "Make a market choice", "DECIDE"],
    ["content", "03", "Content", "Localize the value", "EXPRESS"],
    ["execution", "04", "Execution", "Make the handoffs work", "OPERATE"],
    ["review", "05", "Review", "Turn evidence into learning", "LEARN"],
  ],
  zh: [
    ["insight", "01", "洞察", "看见本地现实", "OBSERVE"],
    ["strategy", "02", "策略", "做出市场选择", "DECIDE"],
    ["content", "03", "内容", "本地化价值表达", "EXPRESS"],
    ["execution", "04", "执行", "让交接真正落地", "OPERATE"],
    ["review", "05", "复盘", "把证据变成学习", "LEARN"],
  ],
} as const;

export function HomePage({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const skills = getSkills(locale);
  const cases = getCases(locale);
  const homePath = localizedPath(locale);
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl(homePath + "#website"),
    url: absoluteUrl(homePath),
    name: siteConfig.name,
    alternateName: locale === "en" ? "China Marketing Skills for AI Agents" : "中国市场 AI Skill Hub",
    description: siteConfig.locales[locale].description,
    inLanguage: localeConfig[locale].languageTag,
    sameAs: [siteConfig.githubUrl],
  };

  return (
    <>
      <JsonLd data={homeJsonLd} />
      <section className="hero shell">
        <div className="hero-copy reveal reveal-1">
          <div className="eyebrow"><span>READY</span> / {content.eyebrow.replace("READY / ", "")}</div>
          <h1>{content.hero}</h1>
          <p className="hero-lead">{content.lead}</p>
          <form action={localizedPath(locale, "/skills")} className="hero-search">
            <label htmlFor={`hero-query-${locale}`}>{content.searchLabel}</label>
            <div>
              <span aria-hidden="true">&gt;_</span>
              <input id={`hero-query-${locale}`} name="q" placeholder={content.searchPlaceholder} />
              <button type="submit">RUN ↗</button>
            </div>
          </form>
          <div className="quick-links" aria-label={locale === "en" ? "Quick tasks" : "快捷任务"}>
            <span>QUICK.RUN</span>
            {content.quick.map(([label, query]) => <Link href={`${localizedPath(locale, "/skills")}?q=${encodeURIComponent(query)}`} key={label}>{label}</Link>)}
          </div>
        </div>

        <div className="mission-panel reveal reveal-2" aria-label={content.panelLabel}>
          <div className="panel-topline"><span>MISSION.CONTROL</span><span>CHINA_MARKETING_OS</span></div>
          <div className="radar-field" aria-hidden="true">
            <div className="radar-ring ring-1" /><div className="radar-ring ring-2" />
            <div className="radar-cross cross-x" /><div className="radar-cross cross-y" /><div className="radar-sweep" />
            <span className="radar-node node-1" /><span className="radar-node node-2" /><span className="radar-node node-3" />
            <strong>10</strong><small>MODULES READY</small>
          </div>
          <div className="system-readout">
            <div><span>WORKFLOW</span><strong>05 PHASES</strong></div>
            <div><span>LANGUAGE</span><strong>{content.language}</strong></div>
            <div><span>FORMAT</span><strong>OPEN SKILL</strong></div>
            <div><span>LICENSE</span><strong>MIT</strong></div>
          </div>
          <div className="boot-log"><span>✓ local context</span><span>✓ evidence ledger</span><span>✓ human checkpoints</span></div>
        </div>
      </section>

      <section className="workflow-section shell reveal reveal-3" aria-labelledby={`workflow-title-${locale}`}>
        <div className="section-heading">
          <div><span className="section-code">01 / WORKFLOW MAP</span><h2 id={`workflow-title-${locale}`}>{content.phaseHeading}</h2></div>
          <p>{content.phaseIntro}</p>
        </div>
        <div className="phase-rail">
          {phases[locale].map(([key, no, label, verb, code]) => (
            <Link href={`${localizedPath(locale, "/skills")}?phase=${key}`} className={`phase-node phase-${key}`} key={key}>
              <span className="phase-number">{no}</span><span className="phase-code">{code}</span>
              <strong>{label}</strong><small>{verb}</small><em>{skills.filter((skill) => skill.phase === key).length} MODULES</em>
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-section shell" aria-labelledby={`featured-title-${locale}`}>
        <div className="section-heading compact">
          <div><span className="section-code">02 / MODULE LIBRARY</span><h2 id={`featured-title-${locale}`}>{content.libraryHeading}</h2></div>
          <Link className="text-link" href={localizedPath(locale, "/skills")}>{content.libraryLink}</Link>
        </div>
        <div className="skill-grid featured-grid">
          {skills.slice(0, 6).map((skill) => <SkillCard skill={skill} index={skill.order} locale={locale} key={skill.slug} />)}
        </div>
      </section>

      <section className="case-featured-section shell" aria-labelledby={`cases-featured-title-${locale}`}>
        <div className="section-heading">
          <div><span className="section-code orange">03 / FIELD REPORTS</span><h2 id={`cases-featured-title-${locale}`}>{content.casesHeading}</h2></div>
          <div className="case-featured-intro"><p>{content.casesIntro}</p><Link className="text-link" href={localizedPath(locale, "/cases")}>{content.casesLink}</Link></div>
        </div>
        <div className="home-case-grid">{cases.map((caseStudy) => <CaseCard caseStudy={caseStudy} locale={locale} key={caseStudy.slug} />)}</div>
      </section>

      <section className="principles-section shell" id="principles" aria-labelledby={`principles-title-${locale}`}>
        <div className="principles-copy"><span className="section-code">04 / QUALITY PROTOCOL</span><h2 id={`principles-title-${locale}`}>{content.principlesHeading}</h2><p>{content.principlesIntro}</p></div>
        <ol className="protocol-list">{content.principles.map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}</ol>
      </section>

      <section className="install-cta shell">
        <div className="cta-copy"><span className="section-code orange">05 / INITIALIZE</span><h2>{content.installHeading}</h2><p>{content.installIntro}</p><Link className="primary-link" href={localizedPath(locale, "/install")}>{content.installLink}</Link></div>
        <InstallCommand command={getInstallCommand()} label="INSTALL ALL / 10 MODULES" eventSource="home_all_modules" locale={locale} />
      </section>
    </>
  );
}
