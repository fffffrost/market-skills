import Link from "next/link";
import { notFound } from "next/navigation";
import { InstallCommand } from "@/components/install-command";
import { JsonLd } from "@/components/json-ld";
import { TrackedGithubLink } from "@/components/tracked-github-link";
import { getCasesForSkill } from "@/lib/cases";
import { getFeedbackUrl } from "@/lib/feedback";
import { absoluteUrl, getInstallCommand, siteConfig } from "@/lib/site-config";
import { localeConfig, localizedPath, type Locale } from "@/lib/site-content";
import { getSkill } from "@/lib/skills";

const copy = {
  en: {
    library: "Skill library", ready: "READY TO INSTALL", minimum: "MINIMUM INPUT", output: "OUTPUT",
    boundary: "BOUNDARY / NOT FOR THIS", boundaryTitle: "Know where the workflow must stop.",
    failure: "FAILURE MODES", failureTitle: "These conditions distort the result.", feedbackSkill: "Report a skill problem ↗",
    feedbackDisabled: "Connect GitHub to report a problem", protocol: "EXECUTION PROTOCOL", protocolTitle: "How the skill works",
    try: "TRY THIS", tryTitle: "Start with this job", case: "FIELD REPORT / CASE", caseTitle: "See it inside a complete job.",
    caseIntro: "The case preserves task context, source material, execution trace, output excerpts, and human decisions.", synthetic: "SYNTHETIC",
    package: "PACKAGE CONTENTS", packageTitle: "Inspect the source before installing.", packageIntro: "Instructions, templates, compatibility, and dependencies remain in one open directory.",
    source: "View source on GitHub ↗", sourceDisabled: "Connect GitHub to inspect source", back: "← Back to the skill library", feedback: "Feedback", install: "Install guide →",
    breadcrumb: "Breadcrumb", dev: "DEV MODE / The command uses a repository placeholder. Production builds require a real GitHub repository.",
  },
  zh: {
    library: "技能库", ready: "READY TO INSTALL", minimum: "MINIMUM INPUT / 最低输入", output: "OUTPUT / 交付结果",
    boundary: "BOUNDARY / 不适合直接使用", boundaryTitle: "先判断它不该做什么。",
    failure: "FAILURE MODES / 常见失败原因", failureTitle: "这些情况会让结果失真。", feedbackSkill: "反馈这个 Skill 的问题 ↗",
    feedbackDisabled: "连接 GitHub 后反馈", protocol: "EXECUTION PROTOCOL / 执行流程", protocolTitle: "它会怎样工作",
    try: "TRY THIS", tryTitle: "从这个任务开始", case: "FIELD REPORT / 使用案例", caseTitle: "看它怎样进入一次完整工作。",
    caseIntro: "案例保留了任务背景、起始材料、执行轨迹、输出节选和必须由人完成的判断。", synthetic: "合成演示",
    package: "PACKAGE CONTENTS", packageTitle: "源码透明，安装前可检查。", packageIntro: "Skill 的指令、模板、兼容信息和依赖都保存在同一个目录中。",
    source: "查看 GitHub 源码 ↗", sourceDisabled: "连接 GitHub 后查看源码", back: "← 返回技能库", feedback: "反馈问题", install: "查看安装指南 →",
    breadcrumb: "面包屑", dev: "DEV MODE / 当前命令使用仓库占位符；生产构建会强制要求真实 GitHub 仓库。",
  },
} as const;

export function SkillDetailPage({ slug, locale }: { slug: string; locale: Locale }) {
  const content = copy[locale];
  const skill = getSkill(slug, locale);
  if (!skill) notFound();

  const logicalPath = `/skills/${skill.slug}/`;
  const skillPath = localizedPath(locale, logicalPath);
  const skillUrl = absoluteUrl(skillPath);
  const relatedCases = getCasesForSkill(skill.slug, locale);
  const feedbackUrl = getFeedbackUrl("skill-problem", locale === "en" ? `[Skill problem] ${skill.title}: ` : `[Skill 问题] ${skill.title}：`);
  const skillJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage", "@id": absoluteUrl(skillPath + "#webpage"), url: skillUrl,
        name: `${skill.title} AI Skill`, description: skill.summary, inLanguage: localeConfig[locale].languageTag,
        isPartOf: { "@id": absoluteUrl(localizedPath(locale) + "#website") }, mainEntity: { "@id": absoluteUrl(skillPath + "#skill") },
      },
      {
        "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "en" ? "Home" : "首页", item: absoluteUrl(localizedPath(locale)) },
          { "@type": "ListItem", position: 2, name: content.library, item: absoluteUrl(localizedPath(locale, "/skills/")) },
          { "@type": "ListItem", position: 3, name: skill.title, item: skillUrl },
        ],
      },
      {
        "@type": "SoftwareSourceCode", "@id": absoluteUrl(skillPath + "#skill"), name: skill.title,
        alternateName: skill.english_name, description: skill.summary, url: skillUrl,
        ...(siteConfig.isRepoConfigured ? { codeRepository: `${siteConfig.githubUrl}/tree/main/skills/${skill.slug}` } : {}),
        version: skill.version, dateModified: skill.updated_at, license: "https://opensource.org/license/mit",
        inLanguage: localeConfig[locale].languageTag, programmingLanguage: ["Markdown", "YAML"],
        runtimePlatform: skill.compatibility, keywords: skill.tasks, isAccessibleForFree: true,
      },
    ],
  };

  return (
    <article className={`skill-detail phase-${skill.phase}`}>
      <JsonLd data={skillJsonLd} />
      <div className="shell">
        <nav className="breadcrumbs" aria-label={content.breadcrumb}><Link href={localizedPath(locale, "/skills")}>{content.library}</Link><span>/</span><span>{skill.slug}</span></nav>
        <header className="detail-hero">
          <div className="detail-title-block">
            <div className="eyebrow"><span>{skill.phase_label}</span> / MOD.{String(skill.order).padStart(2, "0")} / v{skill.version}</div>
            <h1>{skill.title}</h1>
            {locale === "zh" && <p className="detail-english">{skill.english_name}</p>}
            <p className="detail-summary">{skill.summary}</p>
            <div className="task-tags detail-tags">{skill.tasks.map((task) => <span key={task}>{task}</span>)}</div>
          </div>
          <div className="detail-status-panel">
            <span className="status-label">MODULE STATUS</span><strong><i /> {content.ready}</strong>
            <dl><div><dt>VERSION</dt><dd>{skill.version}</dd></div><div><dt>UPDATED</dt><dd>{skill.updated_at}</dd></div><div><dt>LICENSE</dt><dd>MIT</dd></div><div><dt>FILES</dt><dd>{String(skill.files.length).padStart(2, "0")}</dd></div></dl>
          </div>
        </header>
        <InstallCommand command={getInstallCommand(skill.slug)} label={`INSTALL / ${skill.slug}`} eventSource="skill_detail" locale={locale} />
        {!siteConfig.isRepoConfigured && <p className="config-notice">{content.dev}</p>}

        <div className="detail-grid">
          <section className="io-panel"><span className="panel-kicker">{content.minimum}</span><ul>{skill.inputs.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section className="io-panel output-panel"><span className="panel-kicker">{content.output}</span><ul>{skill.outputs.map((item) => <li key={item}>{item}</li>)}</ul></section>
        </div>
        <section className="boundary-panel">
          <div><span className="panel-kicker">{content.boundary}</span><h2>{content.boundaryTitle}</h2><ul>{skill.limitations.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><span className="panel-kicker">{content.failure}</span><h2>{content.failureTitle}</h2><ul>{skill.failure_modes.map((item) => <li key={item}>{item}</li>)}</ul>
            {feedbackUrl ? <TrackedGithubLink href={feedbackUrl} target="_blank" rel="noreferrer" eventSource="skill_problem_feedback">{content.feedbackSkill}</TrackedGithubLink> : <span className="is-disabled">{content.feedbackDisabled}</span>}
          </div>
        </section>
        <div className="detail-lower-grid">
          <section className="protocol-panel"><span className="panel-kicker">{content.protocol}</span><h2>{content.protocolTitle}</h2><ol>{skill.protocol_steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol></section>
          <aside className="example-panel"><span className="panel-kicker">{content.try}</span><h2>{content.tryTitle}</h2><div className="prompt-example"><code>Use ${skill.slug}</code><p>{skill.example_prompt}</p></div><div className="compatibility-list"><span>COMPATIBLE</span><div>{skill.compatibility.map((item) => <em key={item}>{item}</em>)}</div></div></aside>
        </div>

        {relatedCases.length > 0 && <section className="skill-cases-panel">
          <div><span className="panel-kicker">{content.case}</span><h2>{content.caseTitle}</h2><p>{content.caseIntro}</p></div>
          <div className="skill-case-links">{relatedCases.map((caseStudy) => <Link href={localizedPath(locale, `/cases/${caseStudy.slug}`)} key={caseStudy.slug}><span>CASE.{String(caseStudy.order).padStart(2, "0")} / {content.synthetic}</span><strong>{caseStudy.title}</strong><em>OPEN REPORT ↗</em></Link>)}</div>
        </section>}

        <section className="files-panel">
          <div><span className="panel-kicker">{content.package}</span><h2>{content.packageTitle}</h2><p>{content.packageIntro}</p></div>
          <ul className="file-tree">{skill.files.map((file) => <li key={file}><span>├─</span>{file}</li>)}</ul>
          {siteConfig.isRepoConfigured ? <TrackedGithubLink className="secondary-link" href={`${siteConfig.githubUrl}/tree/main/skills/${skill.slug}`} target="_blank" rel="noreferrer" eventSource="skill_source">{content.source}</TrackedGithubLink> : <span className="secondary-link is-disabled">{content.sourceDisabled}</span>}
        </section>
        <nav className="detail-end-nav"><Link href={localizedPath(locale, "/skills")}>{content.back}</Link><div><Link href={localizedPath(locale, "/feedback")}>{content.feedback}</Link><Link href={localizedPath(locale, "/install")}>{content.install}</Link></div></nav>
      </div>
    </article>
  );
}
