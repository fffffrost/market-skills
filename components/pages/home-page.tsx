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
    panelCode: "CHINA_MARKETING_OS",
    language: "EN + ZH",
    bootLog: ["✓ local context", "✓ evidence ledger", "✓ human checkpoints"],
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
    eyebrow: "READY / 中文市场任务库 · v2.0",
    hero: <>别从空白<br /><span>Prompt</span> 开始。</>,
    lead: "为市场人量身打造的 AI Skill Hub。装上经过实战提炼的方法，覆盖从洞察到复盘的完整工作链。",
    searchLabel: "你现在要完成什么市场任务？",
    searchPlaceholder: "例如：竞品研究、公众号审稿、活动复盘",
    quick: [
      ["竞品", "竞品"], ["定位", "定位"], ["公众号", "公众号"],
      ["活动", "活动"], ["复盘", "复盘"],
    ],
    panelLabel: "系统概览",
    panelCode: "CN_MARKETING_OS",
    language: "ZH-CN",
    bootLog: ["✓ evidence chain", "✓ output template", "✓ boundary guardrails"],
    phaseHeading: "按工作推进，不按工具堆砌。",
    phaseIntro: "每个 Skill 对应一个清晰任务。它知道什么时候介入、需要什么输入，也知道应该在哪里停下。",
    libraryHeading: "首发技能，全部可用。",
    libraryLink: "打开完整任务库 →",
    casesHeading: <>方法怎么用，<br />要看一次完整工作。</>,
    casesIntro: "从输入、执行到人工判断点，查看 Skill 怎样进入具体任务。",
    casesLink: "打开案例库 →",
    principlesHeading: <>不是写得长，<br />而是做得稳。</>,
    principlesIntro: "每个 Skill 都把营销工作的判断标准、输入边界和交付结构写进 Agent 的工作方式里。",
    principles: [
      ["触发准确", "说清适用场景，也写清不该介入的任务。"],
      ["证据优先", "区分事实、官方口径、分析推断与未知项。"],
      ["交付明确", "输入、步骤、模板和验收标准都可直接复用。"],
      ["源码可查", "开源、可修改，安装前能审阅全部指令和依赖。"],
    ],
    installHeading: <>一次安装，<br />补齐整个市场工作链。</>,
    installIntro: "也可以只选择当前需要的单个 Skill。支持 Codex、Claude Code、Cursor 与其他兼容 Agent Skills 的工具。",
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
    ["insight", "01", "洞察", "看见真正的问题", "OBSERVE"],
    ["strategy", "02", "策略", "做出清晰的选择", "DECIDE"],
    ["content", "03", "内容", "把价值表达出来", "EXPRESS"],
    ["execution", "04", "执行", "让协作真正落地", "OPERATE"],
    ["review", "05", "复盘", "把经验变成资产", "LEARN"],
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
    alternateName: locale === "en" ? "China Marketing Skills for AI Agents" : "市场人的 AI Skill Hub",
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
          <div className="panel-topline"><span>MISSION.CONTROL</span><span>{content.panelCode}</span></div>
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
          <div className="boot-log">{content.bootLog.map((item) => <span key={item}>{item}</span>)}</div>
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
